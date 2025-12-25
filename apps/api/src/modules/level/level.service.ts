import { HTTPException } from "hono/http-exception";
import * as levelRepo from "./level.repository";

export const getAllLevels = async () => {
  return await levelRepo.findAll();
};

export const startGame = async (levelId: string) => {
  const level = await levelRepo.findByIdWithCharacters(levelId);

  if (!level) throw new HTTPException(404, { message: "Level not found" });

  return { level };
};
