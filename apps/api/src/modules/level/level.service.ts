import type { Level, StartGameResponse } from "@retro-search-2/shared";
import { HTTPException } from "hono/http-exception";
import * as sessionService from "@/modules/session/session.service";
import * as levelRepo from "./level.repository";

const TOLERANCE = 3.5;

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
  await sessionService.getPlayableSession(sessionId, levelId);

  const character = await levelRepo.findCharacterById(characterId);

  if (!character || character.levelId !== levelId) {
    throw new HTTPException(404, { message: "Character not found in this level" });
  }

  const isAlreadyFound = await levelRepo.findFoundCharacter(sessionId, characterId);
  if (isAlreadyFound) {
    return { name: character.name, found: true };
  }

  const isWithinRange =
    Math.abs(x - character.xPct) <= TOLERANCE && Math.abs(y - character.yPct) <= TOLERANCE;
  if (isWithinRange) {
    await levelRepo.markCharacterAsFound(sessionId, characterId);

    const [total, found] = await Promise.all([
      levelRepo.countCharactersInLevel(levelId),
      levelRepo.countFoundCharactersInSession(sessionId),
    ]);

    if (total === found) {
      await sessionService.finishSession(sessionId);
    }
  }

  return { name: character.name, found: isWithinRange };
};
