import type { Level, PublicLevel } from "@retro-search-2/shared";
import { and, count, eq, type InferSelectModel } from "drizzle-orm";
import { db } from "@/db";
import { characters, foundCharacters, levels, scores } from "@/db/schema";

export type CharacterWithSecrets = Pick<
  InferSelectModel<typeof characters>,
  "id" | "name" | "xPct" | "yPct" | "levelId"
>;

export const findAll = (): Promise<Level[]> => {
  return db
    .select({
      id: levels.id,
      name: levels.name,
      imageUrl: levels.imageUrl,
    })
    .from(levels);
};

export const findByIdWithCharacters = async (id: string): Promise<PublicLevel | null> => {
  const result = await db.query.levels.findFirst({
    where: eq(levels.id, id),
    columns: {
      id: true,
      name: true,
      imageUrl: true,
    },
    with: {
      characters: {
        columns: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  return result || null;
};

/** @deprecated */
export const findCharacterById = async (id: string): Promise<CharacterWithSecrets | null> => {
  const result = await db.query.characters.findFirst({
    where: eq(characters.id, id),
    columns: {
      id: true,
      name: true,
      levelId: true,
      xPct: true,
      yPct: true,
    },
  });

  return result || null;
};

export const findAllCharacters = async (): Promise<CharacterWithSecrets[]> => {
  return await db.query.characters.findMany({
    columns: {
      id: true,
      name: true,
      levelId: true,
      xPct: true,
      yPct: true,
    },
  });
};

export const findFoundCharacter = async (sessionId: string, characterId: string) => {
  const result = await db.query.foundCharacters.findFirst({
    where: and(
      eq(foundCharacters.sessionId, sessionId),
      eq(foundCharacters.characterId, characterId),
    ),
  });

  return result || null;
};

export const markCharacterAsFound = async (sessionId: string, characterId: string) => {
  const [result] = await db.insert(foundCharacters).values({ sessionId, characterId }).returning();

  if (!result) {
    throw new Error("Failed to mark character as found");
  }

  return result;
};

export const countCharactersInLevel = async (levelId: string): Promise<number> => {
  const [result] = await db
    .select({ count: count() })
    .from(characters)
    .where(eq(characters.levelId, levelId));
  return result?.count ?? 0;
};

export const countFoundCharactersInSession = async (sessionId: string): Promise<number> => {
  const [result] = await db
    .select({ count: count() })
    .from(foundCharacters)
    .where(eq(foundCharacters.sessionId, sessionId));
  return result?.count ?? 0;
};

export const findScoresForLevel = (levelId: string) => {
  return db.query.scores.findMany({
    where: eq(scores.levelId, levelId),
    orderBy: (scores, { asc }) => [asc(scores.scoreMs)],
    limit: 10,
  });
};

export const createScore = async (levelId: string, username: string, scoreMs: number) => {
  const [result] = await db
    .insert(scores)
    .values({
      levelId,
      username,
      scoreMs,
    })
    .returning({
      levelId: scores.levelId,
      username: scores.username,
      scoreMs: scores.scoreMs,
      createdAt: scores.createdAt,
    });

  if (!result) {
    throw new Error("Failed to create score");
  }

  return result;
};
