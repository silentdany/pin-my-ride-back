const supertest = require('supertest');
const app = require('../src/app');
const prisma = require('../src/prismaClient');

// PINS GET
describe('GET methods for pins', () => {
  it('GET /api/v0/pins', async () => {
    const res = await supertest(app)
      .get('/api/v0/pins')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.length).toEqual(5);
  });
});
describe('GET /api/v0/pins/:id', () => {
  it('GET / error (user not found)', async () => {
    const res = await supertest(app)
      .get('/api/v0/pins/0')
      .expect(404)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('stack');
  });
  it('GET / OK (fields provided)', async () => {
    const res = await supertest(app)
      .get('/api/v0/pins/1')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('id');
  });
});
// PINS POST
describe('POST methods for pins', () => {
  it('POST / error (fields missing)', async () => {
    const res = await supertest(app)
      .post('/api/v0/pins')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('message');
  });
  it('POST / OK (fields provided)', async () => {
    const res = await supertest(app)
      .post('/api/v0/pins')
      .field('label', 'laborum Doe')
      .field('summary', 'Beatae tempore harum omnis.')
      .attach('media', './testFiles/test.jpg')
      .field('media_type', 'image')
      .field('date', '2020-08-22T15:05:45.000Z')
      .field('lat', '80.5333')
      .field('long', '52.6925')
      .field('id_ride', 1)
      // .send({
      //   label: 'laborum',
      //   summary: 'Beatae tempore harum omnis.',
      //   media: '/medias/img/7-destinations-parfaites-pour-un-road-trip-jpg.jpg',
      //   media_type: 'image',
      //   date: '2020-08-22T15:05:45.000Z',
      //   lat: '80.5333',
      //   long: '52.6925',
      //   id_ride: 1,
      // })
      .expect(201)
      .expect('Content-Type', /json/);
    // const expected = {
    //   id: 2,
    //   label: 'laborum',
    //   summary: 'Beatae tempore harum omnis.',
    //   media: '/medias/img/7-destinations-parfaites-pour-un-road-trip-jpg.jpg',
    //   media_type: 'image',
    //   date: '2020-08-22T15:05:45.000Z',
    //   lat: '80.5333',
    //   long: '52.6925',
    //   id_ride: 1,
    // };
    expect(res.body).toBe(201);
  });
});
// PINS PUT
describe('PUT methods for pins', () => {
  it('PUT / error (wrong id)', async () => {
    const res = await supertest(app)
      .put('/api/v0/pins/0')
      .send({
        label: 'laborum',
        summary: 'Beatae tempore harum omnis.',
        media: '/medias/img/7-destinations-parfaites-pour-un-road-trip-jpg.jpg',
        media_type: 'image',
        date: '2020-08-22T15:05:45.000Z',
        lat: '80.5333',
        long: '52.6925',
        id_ride: 1,
      })
      .expect(404)
      .expect('Content-Type', 'text/plain; charset=utf-8');
    const expected = {};
    expect(res.body).toEqual(expected);
  });
  it('PUT / error (fields missing)', async () => {
    const res = await supertest(app)
      .put('/api/v0/pins/2')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('message');
  });
  it('PUT / OK (fields provided)', async () => {
    const res = await supertest(app)
      .put('/api/v0/pins/2')
      .send({
        label: 'laborum',
        summary: 'Beatae tempore harum omnis.',
        media: '/medias/img/7-destinations-parfaites-pour-un-road-trip-jpg.jpg',
        media_type: 'image',
        date: '2020-08-22T15:05:45.000Z',
        lat: '80.5333',
        long: '52.6925',
        id_ride: 1,
      })
      .expect(200)
      .expect('Content-Type', /json/);

    const expected = {
      id: 2,
      label: 'laborum',
      summary: 'Beatae tempore harum omnis.',
      media: '/medias/img/7-destinations-parfaites-pour-un-road-trip-jpg.jpg',
      media_type: 'image',
      date: '2020-08-22T15:05:45.000Z',
      lat: '80.5333',
      long: '52.6925',
      id_ride: 1,
    };
    expect(res.body).toEqual(expected);
  });
});
// PINS DELETE
describe('DELETE methods for pins', () => {
  it('DELETE / error (wrong id)', async () => {
    const res = await supertest(app)
      .delete('/api/v0/pins/0')
      .expect(404)
      .expect('Content-Type', 'text/plain; charset=utf-8');
    const expected = {};
    expect(res.body).toEqual(expected);
  });
  it('DELETE / OK (user successfully deleted)', async () => {
    await supertest(app).delete('/api/v0/pins/2').expect(204);
  });
});

afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});
