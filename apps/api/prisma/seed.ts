import prisma from "@/db";

async function main() {
  console.log("Seeding database...");

  await prisma.score.deleteMany();
  await prisma.character.deleteMany();
  await prisma.level.deleteMany();

  await prisma.level.create({
    data: {
      name: "SNES",
      imageUrl: "/public/images/levels/level-snes.png",
      characters: {
        create: [
          {
            name: "Chrono",
            imageUrl: "/public/images/chars/snes-chrono.png",
            xPct: 50.3,
            yPct: 64.5,
          },
          {
            name: "Donkey Kong",
            imageUrl: "/public/images/chars/snes-donkey-kong.png",
            xPct: 21.2,
            yPct: 55.0,
          },
          {
            name: "Ness",
            imageUrl: "/public/images/chars/snes-ness.png",
            xPct: 44.5,
            yPct: 50.3,
          },
          {
            name: "Samus",
            imageUrl: "/public/images/chars/snes-samus.png",
            xPct: 56.2,
            yPct: 76.1,
          },
          {
            name: "Link",
            imageUrl: "/public/images/chars/snes-link.png",
            xPct: 75.6,
            yPct: 46.5,
          },
        ],
      },
    },
  });

  await prisma.level.create({
    data: {
      name: "Nintendo 64",
      imageUrl: "/public/images/levels/level-n64.png",
      characters: {
        create: [
          {
            name: "Fox McCloud",
            imageUrl: "/public/images/chars/n64-fox.png",
            xPct: 16.3,
            yPct: 41.9,
          },
          {
            name: "Luigi",
            imageUrl: "/public/images/chars/n64-luigi.png",
            xPct: 71.8,
            yPct: 48.1,
          },
          {
            name: "Pete",
            imageUrl: "/public/images/chars/n64-pete.png",
            xPct: 56.9,
            yPct: 65.9,
          },
          {
            name: "Captain Falcon",
            imageUrl: "/public/images/chars/n64-falcon.png",
            xPct: 72.8,
            yPct: 74.3,
          },
          {
            name: "Vela",
            imageUrl: "/public/images/chars/n64-vela.png",
            xPct: 23.0,
            yPct: 57.9,
          },
        ],
      },
    },
  });

  await prisma.level.create({
    data: {
      name: "PlayStation 1",
      imageUrl: "/public/images/levels/level-ps1.png",
      characters: {
        create: [
          {
            name: "Alucard",
            imageUrl: "/public/images/chars/ps1-alucard.png",
            xPct: 64.0,
            yPct: 76.1,
          },
          {
            name: "PaRappa",
            imageUrl: "/public/images/chars/ps1-parappa.png",
            xPct: 38.0,
            yPct: 77.9,
          },
          {
            name: "Solid Snake",
            imageUrl: "/public/images/chars/ps1-snake.png",
            xPct: 74.1,
            yPct: 49.9,
          },
          {
            name: "Cloud Strife",
            imageUrl: "/public/images/chars/ps1-cloud.png",
            xPct: 16.9,
            yPct: 50.6,
          },
          {
            name: "Lara Croft",
            imageUrl: "/public/images/chars/ps1-lara-croft.png",
            xPct: 33.1,
            yPct: 54.2,
          },
        ],
      },
    },
  });

  await prisma.level.create({
    data: {
      name: "PlayStation 2",
      imageUrl: "/public/images/levels/level-ps2.png",
      characters: {
        create: [
          {
            name: "Dante",
            imageUrl: "/public/images/chars/ps2-dante.png",
            xPct: 29.7,
            yPct: 68.7,
          },
          {
            name: "Amaterasu",
            imageUrl: "/public/images/chars/ps2-okami.png",
            xPct: 35.9,
            yPct: 57.3,
          },
          {
            name: "Yuna",
            imageUrl: "/public/images/chars/ps2-yuna.png",
            xPct: 23.7,
            yPct: 44.4,
          },
          {
            name: "Ratchet",
            imageUrl: "/public/images/chars/ps2-ratchet.png",
            xPct: 47.3,
            yPct: 65.4,
          },
          {
            name: "The Prince",
            imageUrl: "/public/images/chars/ps2-prince.png",
            xPct: 77.8,
            yPct: 44.8,
          },
        ],
      },
    },
  });

  await prisma.level.create({
    data: {
      name: "Dreamcast",
      imageUrl: "/public/images/levels/level-dreamcast.png",
      characters: {
        create: [
          {
            name: "Sonic",
            imageUrl: "/public/images/chars/dreamcast-sonic.png",
            xPct: 27.8,
            yPct: 37.3,
          },
          {
            name: "Mew",
            imageUrl: "/public/images/chars/dreamcast-mew.png",
            xPct: 65.4,
            yPct: 75.1,
          },
          {
            name: "Ryo Hazuki",
            imageUrl: "/public/images/chars/dreamcast-ryo.png",
            xPct: 46.4,
            yPct: 71.0,
          },
          {
            name: "Ulala",
            imageUrl: "/public/images/chars/dreamcast-ulala.png",
            xPct: 50.8,
            yPct: 84.1,
          },
          {
            name: "Edward Falcon",
            imageUrl: "/public/images/chars/dreamcast-falcon.png",
            xPct: 56.6,
            yPct: 56.4,
          },
        ],
      },
    },
  });

  const levels = await prisma.level.findMany({ orderBy: { name: "asc" } });
  const [dreamcast, n64, ps1, ps2, snes] = levels;

  if (!dreamcast || !n64 || !ps1 || !ps2 || !snes) {
    throw new Error("Not all levels were created");
  }

  // Dreamcast scores
  await prisma.score.createMany({
    data: [
      { levelId: dreamcast.id, username: "ACE", scoreMs: 42130 },
      { levelId: dreamcast.id, username: "ZRO", scoreMs: 45890 },
      { levelId: dreamcast.id, username: "BLU", scoreMs: 48250 },
      { levelId: dreamcast.id, username: "SKY", scoreMs: 51700 },
      { levelId: dreamcast.id, username: "FOX", scoreMs: 54320 },
      { levelId: dreamcast.id, username: "JET", scoreMs: 58900 },
      { levelId: dreamcast.id, username: "NEO", scoreMs: 62140 },
      { levelId: dreamcast.id, username: "VEX", scoreMs: 67580 },
    ],
  });

  // Nintendo 64 scores
  await prisma.score.createMany({
    data: [
      { levelId: n64.id, username: "MAX", scoreMs: 38450 },
      { levelId: n64.id, username: "KAI", scoreMs: 41200 },
      { levelId: n64.id, username: "RYU", scoreMs: 44890 },
      { levelId: n64.id, username: "LEX", scoreMs: 48320 },
      { levelId: n64.id, username: "ZEN", scoreMs: 52670 },
      { levelId: n64.id, username: "RAY", scoreMs: 56240 },
      { levelId: n64.id, username: "DEN", scoreMs: 59800 },
      { levelId: n64.id, username: "ROX", scoreMs: 64150 },
    ],
  });

  // PlayStation 1 scores
  await prisma.score.createMany({
    data: [
      { levelId: ps1.id, username: "PIX", scoreMs: 36780 },
      { levelId: ps1.id, username: "NOX", scoreMs: 40150 },
      { levelId: ps1.id, username: "JAX", scoreMs: 43920 },
      { levelId: ps1.id, username: "LUX", scoreMs: 47560 },
      { levelId: ps1.id, username: "REX", scoreMs: 51230 },
      { levelId: ps1.id, username: "MEG", scoreMs: 54890 },
      { levelId: ps1.id, username: "VIK", scoreMs: 58470 },
      { levelId: ps1.id, username: "AXL", scoreMs: 62900 },
    ],
  });

  // PlayStation 2 scores
  await prisma.score.createMany({
    data: [
      { levelId: ps2.id, username: "JOE", scoreMs: 39560 },
      { levelId: ps2.id, username: "SAM", scoreMs: 42890 },
      { levelId: ps2.id, username: "IVY", scoreMs: 46320 },
      { levelId: ps2.id, username: "TEX", scoreMs: 50100 },
      { levelId: ps2.id, username: "MAV", scoreMs: 53780 },
      { levelId: ps2.id, username: "ZAK", scoreMs: 57420 },
      { levelId: ps2.id, username: "PHX", scoreMs: 61050 },
      { levelId: ps2.id, username: "CYN", scoreMs: 65890 },
    ],
  });

  // SNES scores
  await prisma.score.createMany({
    data: [
      { levelId: snes.id, username: "ASH", scoreMs: 41230 },
      { levelId: snes.id, username: "BEX", scoreMs: 44670 },
      { levelId: snes.id, username: "GUS", scoreMs: 48100 },
      { levelId: snes.id, username: "OWL", scoreMs: 52490 },
      { levelId: snes.id, username: "NYX", scoreMs: 55820 },
      { levelId: snes.id, username: "TAO", scoreMs: 59340 },
      { levelId: snes.id, username: "KIP", scoreMs: 63100 },
      { levelId: snes.id, username: "DOC", scoreMs: 68750 },
    ],
  });

  console.log("✅ Seed completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
