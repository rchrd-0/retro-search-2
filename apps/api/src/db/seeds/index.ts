import env from "@/env";
import { db } from "../index";
import * as schema from "../schema";

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(schema.scores);
  await db.delete(schema.foundCharacters);
  await db.delete(schema.sessions);
  await db.delete(schema.characters);
  await db.delete(schema.levels);

  // 1. SNES
  const [snes] = await db
    .insert(schema.levels)
    .values({
      name: "SNES",
      imageUrl: `${env.CDN_URL}/levels/level-snes.png`,
    })
    .returning();

  if (snes) {
    await db.insert(schema.characters).values([
      {
        levelId: snes.id,
        name: "Chrono",
        imageUrl: `${env.CDN_URL}/chars/snes-chrono.png`,
        xPct: 50.3,
        yPct: 64.5,
      },
      {
        levelId: snes.id,
        name: "Donkey Kong",
        imageUrl: `${env.CDN_URL}/chars/snes-donkey-kong.png`,
        xPct: 21.2,
        yPct: 55.0,
      },
      {
        levelId: snes.id,
        name: "Ness",
        imageUrl: `${env.CDN_URL}/chars/snes-ness.png`,
        xPct: 44.5,
        yPct: 50.3,
      },
      {
        levelId: snes.id,
        name: "Samus",
        imageUrl: `${env.CDN_URL}/chars/snes-samus.png`,
        xPct: 56.2,
        yPct: 76.1,
      },
      {
        levelId: snes.id,
        name: "Link",
        imageUrl: `${env.CDN_URL}/chars/snes-link.png`,
        xPct: 75.6,
        yPct: 46.5,
      },
    ]);
  }

  // 2. Nintendo 64
  const [n64] = await db
    .insert(schema.levels)
    .values({
      name: "Nintendo 64",
      imageUrl: `${env.CDN_URL}/levels/level-n64.png`,
    })
    .returning();

  if (n64) {
    await db.insert(schema.characters).values([
      {
        levelId: n64.id,
        name: "Fox McCloud",
        imageUrl: `${env.CDN_URL}/chars/n64-fox.png`,
        xPct: 16.3,
        yPct: 41.9,
      },
      {
        levelId: n64.id,
        name: "Luigi",
        imageUrl: `${env.CDN_URL}/chars/n64-luigi.png`,
        xPct: 71.8,
        yPct: 48.1,
      },
      {
        levelId: n64.id,
        name: "Pete",
        imageUrl: `${env.CDN_URL}/chars/n64-pete.png`,
        xPct: 56.9,
        yPct: 65.9,
      },
      {
        levelId: n64.id,
        name: "Captain Falcon",
        imageUrl: `${env.CDN_URL}/chars/n64-falcon.png`,
        xPct: 72.8,
        yPct: 74.3,
      },
      {
        levelId: n64.id,
        name: "Vela",
        imageUrl: `${env.CDN_URL}/chars/n64-vela.png`,
        xPct: 23.0,
        yPct: 57.9,
      },
    ]);
  }

  // 3. PlayStation 1
  const [ps1] = await db
    .insert(schema.levels)
    .values({
      name: "PlayStation 1",
      imageUrl: `${env.CDN_URL}/levels/level-ps1.png`,
    })
    .returning();

  if (ps1) {
    await db.insert(schema.characters).values([
      {
        levelId: ps1.id,
        name: "Alucard",
        imageUrl: `${env.CDN_URL}/chars/ps1-alucard.png`,
        xPct: 64.0,
        yPct: 76.1,
      },
      {
        levelId: ps1.id,
        name: "PaRappa",
        imageUrl: `${env.CDN_URL}/chars/ps1-parappa.png`,
        xPct: 38.0,
        yPct: 77.9,
      },
      {
        levelId: ps1.id,
        name: "Solid Snake",
        imageUrl: `${env.CDN_URL}/chars/ps1-snake.png`,
        xPct: 74.1,
        yPct: 49.9,
      },
      {
        levelId: ps1.id,
        name: "Cloud Strife",
        imageUrl: `${env.CDN_URL}/chars/ps1-cloud.png`,
        xPct: 16.9,
        yPct: 50.6,
      },
      {
        levelId: ps1.id,
        name: "Lara Croft",
        imageUrl: `${env.CDN_URL}/chars/ps1-lara-croft.png`,
        xPct: 33.1,
        yPct: 54.2,
      },
    ]);
  }

  // 4. PlayStation 2
  const [ps2] = await db
    .insert(schema.levels)
    .values({
      name: "PlayStation 2",
      imageUrl: `${env.CDN_URL}/levels/level-ps2.png`,
    })
    .returning();

  if (ps2) {
    await db.insert(schema.characters).values([
      {
        levelId: ps2.id,
        name: "Dante",
        imageUrl: `${env.CDN_URL}/chars/ps2-dante.png`,
        xPct: 29.7,
        yPct: 68.7,
      },
      {
        levelId: ps2.id,
        name: "Amaterasu",
        imageUrl: `${env.CDN_URL}/chars/ps2-okami.png`,
        xPct: 35.9,
        yPct: 57.3,
      },
      {
        levelId: ps2.id,
        name: "Yuna",
        imageUrl: `${env.CDN_URL}/chars/ps2-yuna.png`,
        xPct: 23.7,
        yPct: 44.4,
      },
      {
        levelId: ps2.id,
        name: "Ratchet",
        imageUrl: `${env.CDN_URL}/chars/ps2-ratchet.png`,
        xPct: 47.3,
        yPct: 65.4,
      },
      {
        levelId: ps2.id,
        name: "The Prince",
        imageUrl: `${env.CDN_URL}/chars/ps2-prince.png`,
        xPct: 77.8,
        yPct: 44.8,
      },
    ]);
  }

  // 5. Dreamcast
  const [dreamcast] = await db
    .insert(schema.levels)
    .values({
      name: "Dreamcast",
      imageUrl: `${env.CDN_URL}/levels/level-dreamcast.png`,
    })
    .returning();

  if (dreamcast) {
    await db.insert(schema.characters).values([
      {
        levelId: dreamcast.id,
        name: "Sonic",
        imageUrl: `${env.CDN_URL}/chars/dreamcast-sonic.png`,
        xPct: 27.8,
        yPct: 37.3,
      },
      {
        levelId: dreamcast.id,
        name: "Mew",
        imageUrl: `${env.CDN_URL}/chars/dreamcast-mew.png`,
        xPct: 65.4,
        yPct: 75.1,
      },
      {
        levelId: dreamcast.id,
        name: "Ryo Hazuki",
        imageUrl: `${env.CDN_URL}/chars/dreamcast-ryo.png`,
        xPct: 46.4,
        yPct: 71.0,
      },
      {
        levelId: dreamcast.id,
        name: "Ulala",
        imageUrl: `${env.CDN_URL}/chars/dreamcast-ulala.png`,
        xPct: 50.8,
        yPct: 84.1,
      },
      {
        levelId: dreamcast.id,
        name: "Edward Falcon",
        imageUrl: `${env.CDN_URL}/chars/dreamcast-falcon.png`,
        xPct: 56.6,
        yPct: 56.4,
      },
    ]);
  }

  if (!dreamcast || !n64 || !ps1 || !ps2 || !snes) {
    throw new Error("Not all levels were created");
  }

  // Dreamcast scores
  await db.insert(schema.scores).values([
    { levelId: dreamcast.id, username: "ACE", scoreMs: 42130 },
    { levelId: dreamcast.id, username: "ZRO", scoreMs: 45890 },
    { levelId: dreamcast.id, username: "BLU", scoreMs: 48250 },
    { levelId: dreamcast.id, username: "SKY", scoreMs: 51700 },
    { levelId: dreamcast.id, username: "FOX", scoreMs: 54320 },
    { levelId: dreamcast.id, username: "JET", scoreMs: 58900 },
    { levelId: dreamcast.id, username: "NEO", scoreMs: 62140 },
    { levelId: dreamcast.id, username: "VEX", scoreMs: 67580 },
  ]);

  // Nintendo 64 scores
  await db.insert(schema.scores).values([
    { levelId: n64.id, username: "MAX", scoreMs: 38450 },
    { levelId: n64.id, username: "KAI", scoreMs: 41200 },
    { levelId: n64.id, username: "RYU", scoreMs: 44890 },
    { levelId: n64.id, username: "LEX", scoreMs: 48320 },
    { levelId: n64.id, username: "ZEN", scoreMs: 52670 },
    { levelId: n64.id, username: "RAY", scoreMs: 56240 },
    { levelId: n64.id, username: "DEN", scoreMs: 59800 },
    { levelId: n64.id, username: "ROX", scoreMs: 64150 },
  ]);

  // PlayStation 1 scores
  await db.insert(schema.scores).values([
    { levelId: ps1.id, username: "PIX", scoreMs: 36780 },
    { levelId: ps1.id, username: "NOX", scoreMs: 40150 },
    { levelId: ps1.id, username: "JAX", scoreMs: 43920 },
    { levelId: ps1.id, username: "LUX", scoreMs: 47560 },
    { levelId: ps1.id, username: "REX", scoreMs: 51230 },
    { levelId: ps1.id, username: "MEG", scoreMs: 54890 },
    { levelId: ps1.id, username: "VIK", scoreMs: 58470 },
    { levelId: ps1.id, username: "AXL", scoreMs: 62900 },
  ]);

  // PlayStation 2 scores
  await db.insert(schema.scores).values([
    { levelId: ps2.id, username: "JOE", scoreMs: 39560 },
    { levelId: ps2.id, username: "SAM", scoreMs: 42890 },
    { levelId: ps2.id, username: "IVY", scoreMs: 46320 },
    { levelId: ps2.id, username: "TEX", scoreMs: 50100 },
    { levelId: ps2.id, username: "MAV", scoreMs: 53780 },
    { levelId: ps2.id, username: "ZAK", scoreMs: 57420 },
    { levelId: ps2.id, username: "PHX", scoreMs: 61050 },
    { levelId: ps2.id, username: "CYN", scoreMs: 65890 },
  ]);

  // SNES scores
  await db.insert(schema.scores).values([
    { levelId: snes.id, username: "ASH", scoreMs: 41230 },
    { levelId: snes.id, username: "BEX", scoreMs: 44670 },
    { levelId: snes.id, username: "GUS", scoreMs: 48100 },
    { levelId: snes.id, username: "OWL", scoreMs: 52490 },
    { levelId: snes.id, username: "NYX", scoreMs: 55820 },
    { levelId: snes.id, username: "TAO", scoreMs: 59340 },
    { levelId: snes.id, username: "KIP", scoreMs: 63100 },
    { levelId: snes.id, username: "DOC", scoreMs: 68750 },
  ]);

  console.log("✅ Seed completed!");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  });
