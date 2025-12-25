import { LevelIdSchema, VerifyTargetSchema } from "@retro-search-2/shared";
import { Hono } from "hono";
import { validate } from "@/lib/validator";
import * as levelService from "./level.service";

const level = new Hono();

level.get("/", async (c) => {
  const data = await levelService.getAllLevels();

  return c.json({ success: true, data });
});

level.get("/:levelId", validate("param", LevelIdSchema), async (c) => {
  const { levelId } = c.req.valid("param");

  const result = await levelService.startGame(levelId);

  return c.json({ success: true, data: result });
});

level.post(
  "/:levelId/verify",
  validate("param", LevelIdSchema),
  validate("json", VerifyTargetSchema),
  async (c) => {
    const { levelId } = c.req.valid("param");
    const { characterId, x, y } = c.req.valid("json");

    const result = await levelService.verifyTarget(levelId, characterId, x, y);

    return c.json({
      success: result.found,
      message: result.found ? `${result.name} found!` : "Incorrect location",
    });
  },
);

export default level;
