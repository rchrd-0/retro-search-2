import { and, eq, isNull, lt } from "drizzle-orm";
import { db } from "@/db";
import { sessions } from "@/db/schema";

export const findById = (id: string) => {
  return db.query.sessions.findFirst({
    where: eq(sessions.id, id),
  });
};

export const findByIdAndLevel = (id: string, levelId: string) => {
  return db.query.sessions.findFirst({
    where: and(eq(sessions.id, id), eq(sessions.levelId, levelId)),
  });
};

export const create = async (levelId: string) => {
  const [result] = await db
    .insert(sessions)
    .values({
      levelId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour TTL
    })
    .returning();

  if (!result) {
    throw new Error("Failed to create session");
  }

  return result;
};

export const complete = async (id: string, timeMs: number) => {
  const [result] = await db
    .update(sessions)
    .set({ completedAt: new Date(), timeMs })
    .where(eq(sessions.id, id))
    .returning();

  if (!result) {
    throw new Error("Failed to complete session");
  }

  return result;
};

export const markAsUsed = async (id: string) => {
  const [result] = await db
    .update(sessions)
    .set({ used: true })
    .where(eq(sessions.id, id))
    .returning();

  if (!result) {
    throw new Error("Failed to mark session as used");
  }

  return result;
};

export const deleteExpired = () => {
  return db
    .delete(sessions)
    .where(and(lt(sessions.expiresAt, new Date()), isNull(sessions.completedAt)));
};
