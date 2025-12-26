import { defineConfig, env } from "prisma/config";

const getDatabaseUrl = () => {
  const explicitUrl = process.env.DATABASE_URL;
  if (explicitUrl) {
    return explicitUrl;
  }

  const nodeEnv = process.env.NODE_ENV || "development";
  return nodeEnv === "production" ? "file:./prod.db" : "file:./dev.db";
};

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getDatabaseUrl(),
  },
});
