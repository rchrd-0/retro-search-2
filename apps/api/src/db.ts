import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "generated/prisma/client";
import env from "@/env";

const adapter = new PrismaLibSql({
  url: env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter, log: ["query", "info", "warn", "error"] });

export default prisma;
