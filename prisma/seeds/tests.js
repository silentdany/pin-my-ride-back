const faker = require('faker');
const prisma = require('../../src/prismaClient');

(async () => {
  // USERS RESET + SEEDS
  await prisma.user.deleteMany({});
  await prisma.$executeRaw('ALTER TABLE user AUTO_INCREMENT = 1;');
  await prisma.user.create({
    data: {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'P@ssw0rdÿ',
      ride: {},
    },
  });
})().finally(async () => {
  await prisma.$disconnect();
});
