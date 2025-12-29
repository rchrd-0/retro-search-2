import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

const env = createEnv({
  server: {
    NODE_ENV: v.fallback(v.string(), "development"),
    PORT: v.fallback(v.pipe(v.unknown(), v.transform(Number), v.number(), v.integer()), 3001),
    DATABASE_URL: v.fallback(v.string(), "file:./dev.db"),
    TURSO_AUTH_TOKEN: v.optional(v.string()),
    FRONTEND_URL: v.string(),
    CDN_URL: v.pipe(v.string(), v.url()),
  },
  runtimeEnv: Bun.env,
  emptyStringAsUndefined: true,
});

export default env;
