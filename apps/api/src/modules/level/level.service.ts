import { HTTPException } from "hono/http-exception";
import * as levelRepo from "./level.repository";

const TOLERANCE = 3.5;

export const getAllLevels = async () => {
  return await levelRepo.findAll();
};

export const startGame = async (levelId: string) => {
  const level = await levelRepo.findByIdWithCharacters(levelId);

  if (!level) throw new HTTPException(404, { message: "Level not found" });

  return level;
};

export const verifyTarget = async (levelId: string, characterId: string, x: number, y: number) => {
  const character = await levelRepo.findCharacterById(characterId);

  if (!character || character.levelId !== levelId) {
    throw new HTTPException(404, { message: "Character not found in this level" });
  }

  const isWithinRange =
    Math.abs(x - character.xPct) <= TOLERANCE && Math.abs(y - character.yPct) <= TOLERANCE;

  return { name: character.name, found: isWithinRange };
};
