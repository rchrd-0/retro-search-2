/*
  Warnings:

  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Level";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "levels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" DATETIME,
    "time_ms" INTEGER,
    CONSTRAINT "sessions_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_characters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "x_pct" REAL NOT NULL,
    "y_pct" REAL NOT NULL,
    CONSTRAINT "characters_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_characters" ("id", "image_url", "level_id", "name", "x_pct", "y_pct") SELECT "id", "image_url", "level_id", "name", "x_pct", "y_pct" FROM "characters";
DROP TABLE "characters";
ALTER TABLE "new_characters" RENAME TO "characters";
CREATE INDEX "characters_level_id_idx" ON "characters"("level_id");
CREATE TABLE "new_scores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "score_ms" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "scores_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_scores" ("created_at", "id", "level_id", "score_ms", "username") SELECT "created_at", "id", "level_id", "score_ms", "username" FROM "scores";
DROP TABLE "scores";
ALTER TABLE "new_scores" RENAME TO "scores";
CREATE INDEX "scores_level_id_score_ms_idx" ON "scores"("level_id", "score_ms");
CREATE INDEX "scores_created_at_idx" ON "scores"("created_at");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
