import { describe, expect, test } from "bun:test";
import server from "@/index";

describe("API Smoke Test", () => {
  test("GET / should return 200 OK", async () => {
    const req = new Request("http://localhost/");
    const res = await server.fetch(req);

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toEqual({
      success: true,
      ping: "pong",
    });
  });

  test("GET /404 should return 404 Not Found", async () => {
    const req = new Request("http://localhost/this-does-not-exist");
    const res = await server.fetch(req);

    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body).toHaveProperty("success", false);
    expect(body).toHaveProperty("message", "Not found");
  });
});
