import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'player1@dragonvite.local' },
    update: {},
    create: {
      email: 'player1@dragonvite.local',
      name: 'Player One',
      role: 'PLAYER',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'player2@dragonvite.local' },
    update: {},
    create: {
      email: 'player2@dragonvite.local',
      name: 'Player Two',
      role: 'PLAYER',
    },
  });

  // Create profiles
  await prisma.profile.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      bio: 'A brave adventurer',
      location: 'Dragon Kingdom',
    },
  });

  await prisma.profile.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      bio: 'Another brave adventurer',
      location: 'Dragon Kingdom',
    },
  });

  // Create game data
  await prisma.gameData.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      level: 1,
      experience: 0,
      health: 100,
      mana: 50,
      gold: 1000,
      position: { x: 100, y: 100 },
      inventory: [],
    },
  });

  await prisma.gameData.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      level: 1,
      experience: 0,
      health: 100,
      mana: 50,
      gold: 1000,
      position: { x: 200, y: 200 },
      inventory: [],
    },
  });

  console.log('Database seed completed!');
  console.log({ user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
