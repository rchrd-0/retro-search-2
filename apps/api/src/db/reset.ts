import { sql } from "drizzle-orm";
import { client, db } from "./index";

async function main() {
  console.log("🗑️  Resetting database...");

  // 1. Drop the 'drizzle' schema if it exists.
  // Drizzle Kit sometimes stores migration history in a separate schema named 'drizzle'.
  // If we don't drop this, Drizzle might think migrations are already applied.
  await db.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE`);

  // 2. Drop the 'public' schema and recreate it.
  // This ensures EVERYTHING in the main application space is gone (tables, types, views).
  // This is the "nuclear option" to ensure a clean slate.
  await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE`);
  await db.execute(sql`CREATE SCHEMA public`);

  // 3. Restore standard permissions for the public schema
  await db.execute(sql`GRANT ALL ON SCHEMA public TO public`);
  await db.execute(sql`COMMENT ON SCHEMA public IS 'standard public schema'`);

  console.log("✅ Database reset completed!");

  // Close the connection
  await client.end();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Reset failed:", e);
    process.exit(1);
  });
