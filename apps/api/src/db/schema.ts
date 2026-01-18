import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const levels = pgTable("levels", {
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

export const characters = pgTable(
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
    // Postgres uses doublePrecision for floating point numbers
    xPct: doublePrecision("x_pct").notNull(),
    yPct: doublePrecision("y_pct").notNull(),
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

export const scores = pgTable(
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
    // Postgres has a native timestamp type
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
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

export const sessions = pgTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  levelId: text("level_id")
    .notNull()
    .references(() => levels.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  // Postgres has a native boolean type
  used: boolean("used").notNull().default(false),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  timeMs: integer("time_ms"),
});

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  level: one(levels, {
    fields: [sessions.levelId],
    references: [levels.id],
  }),
  foundCharacters: many(foundCharacters),
}));

export const foundCharacters = pgTable(
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
    foundAt: timestamp("found_at", { withTimezone: true }).notNull().defaultNow(),
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
