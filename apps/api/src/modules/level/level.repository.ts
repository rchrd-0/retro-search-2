import type { Level, LevelWithCharacters } from "@retro-search-2/shared";
import prisma from "@/db";

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
