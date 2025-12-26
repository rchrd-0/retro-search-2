import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

const env = createEnv({
  server: {
    PORT: v.fallback(v.pipe(v.unknown(), v.transform(Number), v.number(), v.integer()), 3001),
    DATABASE_URL: v.fallback(
      v.string(),
      Bun.env.NODE_ENV === "production" ? "file:./prod.db" : "file:./dev.db",
    ),
    FRONTEND_URL: v.string(),
    NODE_ENV: v.fallback(v.string(), "development"),
  },
  runtimeEnv: Bun.env,
  emptyStringAsUndefined: true,
});

export default env;
