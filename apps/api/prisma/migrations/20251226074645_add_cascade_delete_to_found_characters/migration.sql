-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_found_characters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "found_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "found_characters_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "found_characters_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_found_characters" ("character_id", "found_at", "id", "session_id") SELECT "character_id", "found_at", "id", "session_id" FROM "found_characters";
DROP TABLE "found_characters";
ALTER TABLE "new_found_characters" RENAME TO "found_characters";
CREATE UNIQUE INDEX "found_characters_session_id_character_id_key" ON "found_characters"("session_id", "character_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
