import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "generated/prisma/client";

const adapter = new PrismaLibSql({
  url: Bun.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter, log: ["query", "info", "warn", "error"] });

export default prisma;
