const faker = require('faker');
const prisma = require('../../src/prismaClient');

(async () => {
  // PINS RESET
  await prisma.pin.deleteMany({});
  await prisma.$executeRaw('ALTER TABLE pin AUTO_INCREMENT = 1;');
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
      email: 'seed@wcs.com',
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
      lat: faker.address.latitude(),
      long: faker.address.longitude(),
      id_user: 1,
    },
  });
  // PINS SEEDS
  await prisma.pin.create({
    data: {
      label: faker.lorem.words(),
      summary: faker.lorem.sentence(),
      media: `/media/img/${faker.system.commonFileName()}`,
      media_type: 'image',
      date: faker.date.past(),
      lat: faker.address.latitude(),
      long: faker.address.longitude(),
      id_ride: 1,
    },
  });
})().finally(async () => {
  await prisma.$disconnect();
});
