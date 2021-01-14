const supertest = require('supertest');
const app = require('../src/app');
const prisma = require('../src/prismaClient');

// RIDES GET
describe('GET methods for rides', () => {
  it('GET /api/v0/rides', async () => {
    const res = await supertest(app)
      .get('/api/v0/rides')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.length).toEqual(1);
  });
});
describe('GET /api/v0/rides/:id', () => {
  it('GET / error (ride not found)', async () => {
    const res = await supertest(app)
      .get('/api/v0/rides/0')
      .expect(404)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('stack');
  });
  it('GET / OK (fields provided)', async () => {
    const res = await supertest(app)
      .get('/api/v0/rides/1')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('id');
  });
});
describe('GET /api/v0/rides/:id/pins', () => {
  it('GET / error (ride not found)', async () => {
    const res = await supertest(app)
      .get('/api/v0/rides/0/pins')
      .expect(404)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('stack');
  });
  it('GET / OK (fields provided)', async () => {
    const res = await supertest(app)
      .get('/api/v0/rides/1/pins')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveLength(4);
  });
});
// RIDES POST
describe('POST methods for rides', () => {
  it('POST / error (fields missing)', async () => {
    const res = await supertest(app)
      .post('/api/v0/rides')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('message');
  });
  it('POST / OK (fields provided)', async () => {
    const res = await supertest(app)
      .post('/api/v0/rides')
      .send({
        label: 'nostrum aut neque',
        summary:
          'Qui totam consequatur est voluptatibus neque maiores. Quidem esse rerum qui possimus voluptatem. Ut saepe occaecati qui et ea sint.',
        start_date: '2020-08-22T10:05:45.000Z',
        end_date: '2020-08-25T15:15:45.000Z',
        lat: '80.4328',
        long: '52.6715',
        id_user: 1,
      })
      .expect(201)
      .expect('Content-Type', /json/);
    const expected = {
      id: 2,
      label: 'nostrum aut neque',
      summary:
        'Qui totam consequatur est voluptatibus neque maiores. Quidem esse rerum qui possimus voluptatem. Ut saepe occaecati qui et ea sint.',
      start_date: '2020-08-22T10:05:45.000Z',
      end_date: '2020-08-25T15:15:45.000Z',
      lat: '80.4328',
      long: '52.6715',
      id_user: 1,
    };
    expect(res.body).toEqual(expected);
  });
});
// RIDES PUT
describe('PUT methods for rides', () => {
  it('PUT / error (wrong id)', async () => {
    const res = await supertest(app)
      .put('/api/v0/rides/0')
      .send({
        label: 'nostrum aut neque',
        summary:
          'Qui totam consequatur est voluptatibus neque maiores. Quidem esse rerum qui possimus voluptatem. Ut saepe occaecati qui et ea sint.',
        start_date: '2020-08-22T10:05:45.000Z',
        end_date: '2020-08-25T15:15:45.000Z',
        lat: '80.4328',
        long: '52.6715',
        id_user: 1,
      })
      .expect(404)
      .expect('Content-Type', 'text/plain; charset=utf-8');
    const expected = {};
    expect(res.body).toEqual(expected);
  });
  it('PUT / error (fields missing)', async () => {
    const res = await supertest(app)
      .put('/api/v0/rides/2')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('message');
  });
  it('PUT / OK (fields provided)', async () => {
    const res = await supertest(app)
      .put('/api/v0/rides/2')
      .send({
        label: 'nostrum aut neque',
        summary:
          'Qui totam consequatur est voluptatibus neque maiores. Quidem esse rerum qui possimus voluptatem. Ut saepe occaecati qui et ea sint.',
        start_date: '2020-08-22T10:05:45.000Z',
        end_date: '2020-08-25T15:15:45.000Z',
        lat: '80.4328',
        long: '52.6715',
        id_user: 1,
      })
      .expect(200)
      .expect('Content-Type', /json/);

    const expected = {
      id: 2,
      label: 'nostrum aut neque',
      summary:
        'Qui totam consequatur est voluptatibus neque maiores. Quidem esse rerum qui possimus voluptatem. Ut saepe occaecati qui et ea sint.',
      start_date: '2020-08-22T10:05:45.000Z',
      end_date: '2020-08-25T15:15:45.000Z',
      lat: '80.4328',
      long: '52.6715',
      id_user: 1,
    };
    expect(res.body).toEqual(expected);
  });
});
// RIDES DELETE
describe('DELETE methods for rides', () => {
  it('DELETE / error (wrong id)', async () => {
    const res = await supertest(app)
      .delete('/api/v0/rides/0')
      .expect(404)
      .expect('Content-Type', 'text/plain; charset=utf-8');
    const expected = {};
    expect(res.body).toEqual(expected);
  });
  it('DELETE / OK (user successfully deleted)', async () => {
    await supertest(app).delete('/api/v0/rides/2').expect(204);
  });
});

afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});
