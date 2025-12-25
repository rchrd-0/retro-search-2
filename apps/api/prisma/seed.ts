import prisma from "@/db";

async function main() {
  console.log("Seeding database...");

  await prisma.score.deleteMany();
  await prisma.character.deleteMany();
  await prisma.level.deleteMany();

  await prisma.level.create({
    data: {
      name: "SNES",
      imageUrl: "/images/levels/level-snes.png",
      characters: {
        create: [
          {
            name: "Chrono",
            imageUrl: "/images/chars/snes-chrono.png",
            xPct: 50.3,
            yPct: 64.5,
          },
          {
            name: "Donkey Kong",
            imageUrl: "/images/chars/snes-donkey-kong.png",
            xPct: 21.2,
            yPct: 55.0,
          },
          {
            name: "Ness",
            imageUrl: "/images/chars/snes-ness.png",
            xPct: 44.5,
            yPct: 50.3,
          },
          {
            name: "Samus",
            imageUrl: "/images/chars/snes-samus.png",
            xPct: 56.2,
            yPct: 76.1,
          },
          {
            name: "Link",
            imageUrl: "/images/chars/snes-link.png",
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
      imageUrl: "/images/levels/level-n64.png",
      characters: {
        create: [
          {
            name: "Fox McCloud",
            imageUrl: "/images/chars/n64-fox.png",
            xPct: 16.3,
            yPct: 41.9,
          },
          {
            name: "Luigi",
            imageUrl: "/images/chars/n64-luigi.png",
            xPct: 71.8,
            yPct: 48.1,
          },
          {
            name: "Pete",
            imageUrl: "/images/chars/n64-pete.png",
            xPct: 56.9,
            yPct: 65.9,
          },
          {
            name: "Captain Falcon",
            imageUrl: "/images/chars/n64-falcon.png",
            xPct: 72.8,
            yPct: 74.3,
          },
          {
            name: "Vela",
            imageUrl: "/images/chars/n64-vela.png",
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
      imageUrl: "/images/levels/level-ps1.png",
      characters: {
        create: [
          {
            name: "Alucard",
            imageUrl: "/images/chars/ps1-alucard.png",
            xPct: 64.0,
            yPct: 76.1,
          },
          {
            name: "PaRappa",
            imageUrl: "/images/chars/ps1-parappa.png",
            xPct: 38.0,
            yPct: 77.9,
          },
          {
            name: "Solid Snake",
            imageUrl: "/images/chars/ps1-snake.png",
            xPct: 74.1,
            yPct: 49.9,
          },
          {
            name: "Cloud Strife",
            imageUrl: "/images/chars/ps1-cloud.png",
            xPct: 16.9,
            yPct: 50.6,
          },
          {
            name: "Lara Croft",
            imageUrl: "/images/chars/ps1-lara-croft.png",
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
      imageUrl: "/images/levels/level-ps2.png",
      characters: {
        create: [
          {
            name: "Dante",
            imageUrl: "/images/chars/ps2-dante.png",
            xPct: 29.7,
            yPct: 68.7,
          },
          {
            name: "Amaterasu",
            imageUrl: "/images/chars/ps2-okami.png",
            xPct: 35.9,
            yPct: 57.3,
          },
          {
            name: "Yuna",
            imageUrl: "/images/chars/ps2-yuna.png",
            xPct: 23.7,
            yPct: 44.4,
          },
          {
            name: "Ratchet",
            imageUrl: "/images/chars/ps2-ratchet.png",
            xPct: 47.3,
            yPct: 65.4,
          },
          {
            name: "The Prince",
            imageUrl: "/images/chars/ps2-prince.png",
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
      imageUrl: "/images/levels/level-dreamcast.png",
      characters: {
        create: [
          {
            name: "Sonic",
            imageUrl: "/images/chars/dreamcast-sonic.png",
            xPct: 27.8,
            yPct: 37.3,
          },
          {
            name: "Mew",
            imageUrl: "/images/chars/dreamcast-mew.png",
            xPct: 65.4,
            yPct: 75.1,
          },
          {
            name: "Ryo Hazuki",
            imageUrl: "/images/chars/dreamcast-ryo.png",
            xPct: 46.4,
            yPct: 71.0,
          },
          {
            name: "Ulala",
            imageUrl: "/images/chars/dreamcast-ulala.png",
            xPct: 50.8,
            yPct: 84.1,
          },
          {
            name: "Edward Falcon",
            imageUrl: "/images/chars/dreamcast-falcon.png",
            xPct: 56.6,
            yPct: 56.4,
          },
        ],
      },
    },
  });

  const levels = await prisma.level.findMany();

  for (const level of levels) {
    await prisma.score.createMany({
      data: [
        {
          levelId: level.id,
          username: "ACE",
          scoreMs: 45230,
        },
        {
          levelId: level.id,
          username: "MAX",
          scoreMs: 52100,
        },
        {
          levelId: level.id,
          username: "PIX",
          scoreMs: 38750,
        },
        {
          levelId: level.id,
          username: "NOX",
          scoreMs: 61500,
        },
        {
          levelId: level.id,
          username: "RAY",
          scoreMs: 47890,
        },
        {
          levelId: level.id,
          username: "ZEN",
          scoreMs: 55340,
        },
        {
          levelId: level.id,
          username: "JOE",
          scoreMs: 43120,
        },
        {
          levelId: level.id,
          username: "KAI",
          scoreMs: 49870,
        },
      ],
    });
  }

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
