import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import env from "@/env";
import { ValidationError } from "@/lib/errors";
import level from "@/modules/level/level.routes";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL,
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization", "X-SESSION-ID"],
    credentials: true,
  }),
);

app.use("/public/*", serveStatic({ root: "./" }));

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

export default {
  port: env.PORT,
  fetch: app.fetch,
};
