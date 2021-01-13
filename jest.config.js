module.exports = {
  // testEnvironment: path.join(__dirname, 'prisma', 'prisma-test-env.js'),
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  globalTeardown: './teardownTest.js',
};
