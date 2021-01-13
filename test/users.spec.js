const supertest = require('supertest');
const app = require('../src/app');
const prisma = require('../src/prismaClient');

// USERS GET
describe('GET methods for users', () => {
  it('GET /api/v0/users', async () => {
    const res = await supertest(app)
      .get('/api/v0/users')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.length).toEqual(1);
  });
});
describe('GET /api/v0/users/:id', () => {
  it('GET / error (user not found)', async () => {
    const res = await supertest(app)
      .get('/api/v0/users/0')
      .expect(404)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('stack');
  });
  it('GET / OK (fields provided)', async () => {
    const res = await supertest(app)
      .get('/api/v0/users/1')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('id');
  });
});
// USERS POST
describe('POST methods for users', () => {
  it('POST / error (fields missing)', async () => {
    const res = await supertest(app)
      .post('/api/v0/users')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('message');
  });
  it('POST / OK (fields provided)', async () => {
    const res = await supertest(app)
      .post('/api/v0/users')
      .send({
        firstname: 'José Michel',
        lastname: "O'Connor",
        email: 'jeantest@wcs.fr',
        password: 'P@ssw0rdÿ',
        ride: {},
      })
      .expect(201)
      .expect('Content-Type', /json/);
    const expected = {
      id: 2,
      firstname: 'José Michel',
      lastname: "O'Connor",
      email: 'jeantest@wcs.fr',
      password: 'P@ssw0rdÿ',
    };
    expect(res.body).toEqual(expected);
  });
});
// USERS PUT
describe('PUT methods for users', () => {
  it('PUT / error (wrong id)', async () => {
    const res = await supertest(app)
      .put('/api/v0/users/0')
      .send({
        firstname: 'José Michel',
        lastname: "O'Connor",
        email: 'jeantest@wcs.fr',
        password: 'P@ssw0rdÿ',
        ride: {},
      })
      .expect(404)
      .expect('Content-Type', 'text/plain; charset=utf-8');
    const expected = {};
    expect(res.body).toEqual(expected);
  });
  it('PUT / error (fields missing)', async () => {
    const res = await supertest(app)
      .put('/api/v0/users/2')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('message');
  });
  it('PUT / OK (fields provided)', async () => {
    const res = await supertest(app)
      .put('/api/v0/users/2')
      .send({
        firstname: 'José Michel',
        lastname: "O'Connor",
        email: 'jeantest@wcs.fr',
        password: 'P@ssw0rdÿ',
        ride: {},
      })
      .expect(200)
      .expect('Content-Type', /json/);

    const expected = {
      id: 2,
      firstname: 'José Michel',
      lastname: "O'Connor",
      email: 'jeantest@wcs.fr',
      password: 'P@ssw0rdÿ',
    };
    expect(res.body).toEqual(expected);
  });
});
// USERS DELETE
describe('DELETE methods for users', () => {
  it('DELETE / error (wrong id)', async () => {
    const res = await supertest(app)
      .delete('/api/v0/users/0')
      .expect(404)
      .expect('Content-Type', 'text/plain; charset=utf-8');
    const expected = {};
    expect(res.body).toEqual(expected);
  });
  it('DELETE / OK (user successfully deleted)', async () => {
    await supertest(app).delete('/api/v0/users/2').expect(204);
  });
});

afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});
