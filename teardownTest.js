const prisma = require('./src/prismaClient');

module.exports = async () => {
  await prisma.$disconnect();
};
