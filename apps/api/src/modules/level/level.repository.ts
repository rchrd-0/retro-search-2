import type { Level, LevelWithCharacters } from "@retro-search-2/shared";
import type { Prisma } from "generated/prisma/client";
import prisma from "@/db";

export type CharacterWithSecrets = Prisma.CharacterGetPayload<{
  select: { id: true; name: true; xPct: true; yPct: true; levelId: true };
}>;

export const findAll = (): Promise<Level[]> => {
  return prisma.level.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });
};

export const findByIdWithCharacters = (id: string): Promise<LevelWithCharacters | null> => {
  return prisma.level.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      characters: { select: { id: true, name: true, imageUrl: true } },
    },
  });
};

export const findCharacterById = (id: string): Promise<CharacterWithSecrets | null> => {
  return prisma.character.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      levelId: true,
      xPct: true,
      yPct: true,
    },
  });
};
