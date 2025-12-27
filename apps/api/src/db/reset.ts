import { sql } from "drizzle-orm";
import { db } from "./index";

async function main() {
  console.log("🗑️  Dropping all tables...");

  // Disable foreign keys to avoid constraint errors during drop
  await db.run(sql`PRAGMA foreign_keys = OFF`);

  const tables = [
    "found_characters",
    "scores",
    "sessions",
    "characters",
    "levels",
    "__drizzle_migrations",
  ];

  for (const table of tables) {
    console.log(`Dropping table: ${table}`);
    await db.run(sql.raw(`DROP TABLE IF EXISTS ${table}`));
  }

  // Enable foreign keys back
  await db.run(sql`PRAGMA foreign_keys = ON`);

  console.log("✅ Database reset completed!");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Reset failed:", e);
    process.exit(1);
  });
