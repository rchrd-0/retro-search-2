import type { Level, StartGameResponse } from "@retro-search-2/shared";
import { HTTPException } from "hono/http-exception";
import * as sessionService from "@/modules/session/session.service";
import * as levelRepo from "./level.repository";

const TOLERANCE = 3.5;

let charactersCache: Map<string, levelRepo.CharacterWithSecrets> | null = null;
let levelCharacterCountCache: Map<string, number> | null = null;

const loadCache = async () => {
  if (charactersCache) return;

  const allCharacters = await levelRepo.findAllCharacters();
  charactersCache = new Map(allCharacters.map((character) => [character.id, character]));

  levelCharacterCountCache = new Map();
  for (const character of allCharacters) {
    const current = levelCharacterCountCache.get(character.levelId) || 0;
    levelCharacterCountCache.set(character.levelId, current + 1);
  }
};

export const getAllLevels = async (): Promise<Level[]> => {
  return await levelRepo.findAll();
};

export const startGame = async (levelId: string): Promise<StartGameResponse> => {
  const level = await levelRepo.findByIdWithCharacters(levelId);

  if (!level) throw new HTTPException(404, { message: "Level not found" });

  const session = await sessionService.createSession(levelId);

  return {
    level,
    sessionId: session.id,
  };
};

export const verifyTarget = async (
  levelId: string,
  sessionId: string,
  characterId: string,
  x: number,
  y: number,
) => {
  await loadCache();

  if (!charactersCache || !levelCharacterCountCache) {
    throw new HTTPException(500, { message: "Internal server error" });
  }

  // 1. Memory Lookup
  const character = charactersCache.get(characterId);

  if (!character || character.levelId !== levelId) {
    throw new HTTPException(404, { message: "Character not found in this level" });
  }

  // 2. Optimistic Math Check (No DB)
  const isWithinRange =
    Math.abs(x - character.xPct) <= TOLERANCE && Math.abs(y - character.yPct) <= TOLERANCE;

  if (!isWithinRange) {
    return { name: character.name, found: false };
  }

  // 3. Only Validate Session & Duplicates if they actually clicked the right spot
  const [, isAlreadyFound] = await Promise.all([
    sessionService.getPlayableSession(sessionId, levelId),
    levelRepo.findFoundCharacter(sessionId, characterId),
  ]);

  if (isAlreadyFound) {
    return { name: character.name, found: true };
  }

  // 4. Mark Found
  await levelRepo.markCharacterAsFound(sessionId, characterId);

  // 5. Check Victory Condition
  const totalInLevel = levelCharacterCountCache.get(levelId) || 0;
  const foundCount = await levelRepo.countFoundCharactersInSession(sessionId);

  if (totalInLevel === foundCount) {
    await sessionService.finishSession(sessionId);
  }

  return { name: character.name, found: true };
};

export const getLeaderboard = async (levelId: string) => {
  return await levelRepo.findScoresForLevel(levelId);
};

export const submitScore = async (sessionId: string, username: string) => {
  const session = await sessionService.getSession(sessionId);

  if (!session.timeMs) {
    throw new HTTPException(400, { message: "Game session not finished" });
  }

  if (session.used) {
    throw new HTTPException(409, { message: "Score already submitted" });
  }

  const score = levelRepo.createScore(session.levelId, username, session.timeMs);

  await sessionService.markSessionAsUsed(sessionId);

  return score;
};
