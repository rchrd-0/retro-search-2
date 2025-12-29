import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { rateLimiter } from "hono-rate-limiter";
import { client } from "@/db";
import env from "@/env";
import { ValidationError } from "@/lib/errors";
import level from "@/modules/level/level.routes";

const app = new Hono()
  .use("*", logger())
  .use("*", secureHeaders())
  .use("*", compress())
  .use(
    "*",
    cors({
      origin: env.FRONTEND_URL,
      allowMethods: ["GET", "POST"],
      allowHeaders: ["Content-Type", "Authorization", "X-SESSION-ID"],
      credentials: true,
    }),
  )
  .use(
    "*",
    rateLimiter({
      windowMs: 60 * 1000,
      limit: 100,
      standardHeaders: "draft-6",
      keyGenerator: (c) => {
        return c.req.header("fly-client-ip") || c.req.header("x-forwarded-for") || "unknown";
      },
    }),
  );

app.onError((err, c) => {
  if (err instanceof ValidationError) {
    return c.json(
      {
        success: false,
        message: "Validation failed",
        errors: err.issues.map((issue) => ({
          field: issue.path?.join(".") || "unknown",
          message: issue.message,
        })),
      },
      400,
    );
  }

  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        message: err.message,
      },
      err.status,
    );
  }

  console.error("Unhandled error:", err);
  return c.json(
    {
      success: false,
      message: "Internal server error",
    },
    500,
  );
});

app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: "Not found",
    },
    404,
  );
});

app.get("/", (c) => {
  return c.json({
    success: true,
    ping: "pong",
  });
});

app.route("/level", level);

const shutdown = () => {
  console.log("Shutting down... Closing database connection.");
  client.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
