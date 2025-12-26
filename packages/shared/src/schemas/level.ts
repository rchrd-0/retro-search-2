import * as v from "valibot";

export const IdSchema = v.pipe(v.string(), v.nanoid(), v.length(21));

export const LevelIdSchema = v.object({
  levelId: IdSchema,
});

export const VerifyTargetSchema = v.object({
  characterId: IdSchema,
  x: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
  y: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
});

export type VerifyTarget = v.InferOutput<typeof VerifyTargetSchema>;

export const LeaderboardSchema = v.object({
  username: v.pipe(v.string(), v.length(3)),
});

export type LeaderboardEntry = v.InferOutput<typeof LeaderboardSchema>;

export const LevelSchema = v.object({
  id: IdSchema,
  name: v.string(),
  imageUrl: v.string(),
});

export const CharacterSchema = v.object({
  id: IdSchema,
  name: v.string(),
  imageUrl: v.string(),
});

export const PublicLevelSchema = v.object({
  id: IdSchema,
  name: v.string(),
  imageUrl: v.string(),
  characters: v.array(CharacterSchema),
});

export const StartGameResponseSchema = v.object({
  level: PublicLevelSchema,
  sessionId: IdSchema,
});

export type Level = v.InferOutput<typeof LevelSchema>;
export type Character = v.InferOutput<typeof CharacterSchema>;
export type PublicLevel = v.InferOutput<typeof PublicLevelSchema>;
export type StartGameResponse = v.InferOutput<typeof StartGameResponseSchema>;

export const ScoreSchema = v.object({
  levelId: IdSchema,
  username: v.pipe(v.string(), v.length(3)),
  createdAt: v.date(),
  scoreMs: v.number(),
});

export type Score = v.InferOutput<typeof ScoreSchema>;
