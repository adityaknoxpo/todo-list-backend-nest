import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const todo1 = await prisma.todoList.upsert({
    where: { title: 'learn nestJs' },
    update: {},
    create: {
        title: 'learn nestJs',
        description: 'this is frist todo',
        userId: '64b925250d070c1ef9454419'
    },
  });

  const todo2 = await prisma.todoList.upsert({
    where: { title: 'learn prisma' },
    update: {},
    create: {
        title: 'learn prisma',
        description: 'this is second todo',
        userId: '64b925250d070c1ef9454419'
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
