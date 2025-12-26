import { HTTPException } from "hono/http-exception";
import * as sessionRepo from "./session.repository";

export const createSession = async (levelId: string) => {
  sessionRepo.deleteExpired().catch((err) => console.error("Cleanup failed", err));

  return await sessionRepo.create(levelId);
};

export const getSession = async (id: string, levelId?: string) => {
  const session = levelId
    ? await sessionRepo.findByIdAndLevel(id, levelId)
    : await sessionRepo.findById(id);

  if (!session) {
    throw new HTTPException(401, { message: "Invalid session" });
  }

  return session;
};

export const getPlayableSession = async (sessionId: string, levelId: string) => {
  const session = await sessionRepo.findById(sessionId);

  if (!session || session.levelId !== levelId) {
    throw new HTTPException(401, { message: "Invalid session" });
  }

  if (session.used) {
    throw new HTTPException(401, { message: "Session already finished" });
  }

  if (Date.now() > session.expiresAt.getTime()) {
    throw new HTTPException(401, { message: "Session expired" });
  }

  return session;
};

export const finishSession = async (id: string) => {
  const session = await getSession(id);
  const timeMs = Date.now() - session.createdAt.getTime();

  const completedSession = await sessionRepo.complete(id, timeMs);

  sessionRepo.deleteExpired().catch((err) => console.error("Cleanup failed", err));

  return completedSession;
};

export const markSessionAsUsed = async (id: string) => {
  return await sessionRepo.markAsUsed(id);
};
