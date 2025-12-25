import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.use("*", cors());

app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: "Not found",
    },
    404,
  );
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        message: err.message,
      },
      err.status,
    );
  }

  console.error("Unhandled error");
  return c.json(
    {
      success: false,
      message: "Internal server error",
    },
    500,
  );
});

app.get("/", (c) => {
  return c.json({
    success: true,
    ping: "pong",
  });
});

export default {
  fetch: app.fetch,
};
