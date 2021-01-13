const faker = require('faker');
const prisma = require('../../src/prismaClient');

(async () => {
  const users = new Array(5).fill('').map(() => {
    return prisma.user.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'P@ssw0rdÿ',
        ride: null,
      },
    });
  });

  await prisma.user.deleteMany({});

  await Promise.all(users).then(() => {
    // eslint-disable-next-line no-console
    console.log('Seeds done !');
  });
})().finally(async () => {
  await prisma.$disconnect();
});
