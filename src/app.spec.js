const supertest = require('supertest');

const app = require('./app');
const prisma = require('./prismaClient');

describe('GET /', () => {
  it('Should respond with a message', async () => {
    const res = await supertest(app)
      .get('/api/v0')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('message');
  });
});

afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});
