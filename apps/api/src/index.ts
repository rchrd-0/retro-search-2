import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    success: true,
    ping: "pong",
  });
});

export default {
  fetch: app.fetch,
};
