import { relations } from "drizzle-orm";
import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const levels = sqliteTable("levels", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const levelsRelations = relations(levels, ({ many }) => ({
  characters: many(characters),
  scores: many(scores),
  sessions: many(sessions),
}));

export const characters = sqliteTable(
  "characters",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    levelId: text("level_id")
      .notNull()
      .references(() => levels.id),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    xPct: real("x_pct").notNull(),
    yPct: real("y_pct").notNull(),
  },
  (t) => ({
    levelIdIdx: index("characters_level_id_idx").on(t.levelId),
  }),
);

export const charactersRelations = relations(characters, ({ one, many }) => ({
  level: one(levels, {
    fields: [characters.levelId],
    references: [levels.id],
  }),
  foundCharacters: many(foundCharacters),
}));

export const scores = sqliteTable(
  "scores",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    levelId: text("level_id")
      .notNull()
      .references(() => levels.id),
    username: text("username").notNull(),
    scoreMs: integer("score_ms").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => ({
    levelIdScoreMsIdx: index("scores_level_id_score_ms_idx").on(t.levelId, t.scoreMs),
    createdAtIdx: index("scores_created_at_idx").on(t.createdAt),
  }),
);

export const scoresRelations = relations(scores, ({ one }) => ({
  level: one(levels, {
    fields: [scores.levelId],
    references: [levels.id],
  }),
}));

export const sessions = sqliteTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  levelId: text("level_id")
    .notNull()
    .references(() => levels.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  used: integer("used", { mode: "boolean" }).notNull().default(false),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  timeMs: integer("time_ms"),
});

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  level: one(levels, {
    fields: [sessions.levelId],
    references: [levels.id],
  }),
  foundCharacters: many(foundCharacters),
}));

export const foundCharacters = sqliteTable(
  "found_characters",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    sessionId: text("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    characterId: text("character_id")
      .notNull()
      .references(() => characters.id),
    foundAt: integer("found_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => ({
    uniqueSessionCharacter: uniqueIndex("found_characters_session_id_character_id_unique").on(
      t.sessionId,
      t.characterId,
    ),
  }),
);

export const foundCharactersRelations = relations(foundCharacters, ({ one }) => ({
  session: one(sessions, {
    fields: [foundCharacters.sessionId],
    references: [sessions.id],
  }),
  character: one(characters, {
    fields: [foundCharacters.characterId],
    references: [characters.id],
  }),
}));
