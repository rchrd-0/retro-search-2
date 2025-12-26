import prisma from "@/db";

export const findById = (id: string) => {
  return prisma.session.findUnique({
    where: { id },
  });
};

export const findByIdAndLevel = (id: string, levelId: string) => {
  return prisma.session.findUnique({
    where: { id, levelId },
  });
};

export const create = (levelId: string) => {
  return prisma.session.create({
    data: {
      levelId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour TTL
    },
  });
};

export const complete = (id: string, timeMs: number) => {
  return prisma.session.update({
    where: { id },
    data: { completedAt: new Date(), timeMs },
  });
};

export const markAsUsed = (id: string) => {
  return prisma.session.update({
    where: { id },
    data: { used: true },
  });
};

export const deleteExpired = () => {
  return prisma.session.deleteMany({
    where: {
      AND: [{ expiresAt: { lt: new Date() } }, { completedAt: null }],
    },
  });
};
