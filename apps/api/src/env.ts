import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

const env = createEnv({
  server: {
    PORT: v.fallback(v.pipe(v.unknown(), v.transform(Number), v.number(), v.integer()), 3001),
    DATABASE_URL: v.fallback(v.string(), "file:./dev.db"),
    TURSO_AUTH_TOKEN: v.optional(v.string()),
    FRONTEND_URL: v.string(),
  },
  runtimeEnv: Bun.env,
  emptyStringAsUndefined: true,
});

export default env;
