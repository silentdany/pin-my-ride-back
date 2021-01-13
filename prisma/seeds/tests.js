const faker = require('faker');
const prisma = require('../../src/prismaClient');

(async () => {
  // RIDES RESET
  await prisma.ride.deleteMany({});
  await prisma.$executeRaw('ALTER TABLE ride AUTO_INCREMENT = 1;');
  // USERS RESET
  await prisma.user.deleteMany({});
  await prisma.$executeRaw('ALTER TABLE user AUTO_INCREMENT = 1;');
  // USERS SEEDS
  await prisma.user.create({
    data: {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'P@ssw0rdÿ',
      ride: {},
    },
  });
  // RIDES SEEDS
  await prisma.ride.create({
    data: {
      label: faker.lorem.words(),
      summary: faker.lorem.sentence(),
      start_date: faker.date.past(),
      end_date: faker.date.past(),
      start_coord: {
        lat: faker.address.latitude(),
        long: faker.address.longitude(),
      },
      id_user: 1,
    },
  });
})().finally(async () => {
  await prisma.$disconnect();
});
