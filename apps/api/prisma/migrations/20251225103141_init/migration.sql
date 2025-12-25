-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "x_pct" REAL NOT NULL,
    "y_pct" REAL NOT NULL,
    CONSTRAINT "characters_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "scores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "score_ms" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "scores_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "characters_level_id_idx" ON "characters"("level_id");

-- CreateIndex
CREATE INDEX "scores_level_id_score_ms_idx" ON "scores"("level_id", "score_ms");

-- CreateIndex
CREATE INDEX "scores_created_at_idx" ON "scores"("created_at");
