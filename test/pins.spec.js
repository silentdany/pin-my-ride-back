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
let uploadPath = '';
describe('POST methods for pins', () => {
  it('POST / OK (file uploaded)', async () => {
    const res = await supertest(app)
      .post('/api/v0/pins/upload')
      .attach('media', './testFiles/test.jpg')
      .expect(201)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('path');
    uploadPath = res.body.path;
  });
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
      .send({
        label: 'laborum',
        summary: 'Beatae tempore harum omnis.',
        media: uploadPath,
        media_type: 'image',
        lat: '80.5333',
        long: '52.6925',
        id_ride: 1,
      })
      .expect(201)
      .expect('Content-Type', /json/);
    const expected = {
      id: 6,
      label: 'laborum',
      summary: 'Beatae tempore harum omnis.',
      media: uploadPath,
      media_type: 'image',
      lat: '80.5333',
      long: '52.6925',
      id_ride: 1,
    };
    expect(res.body).toEqual(expected);
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
        media: uploadPath,
        media_type: 'image',
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
      .put('/api/v0/pins/6')
      .send({
        label: 'laborum',
        summary: 'Beatae tempore harum omnis.',
        media: uploadPath,
        media_type: 'image',
        lat: '80.5333',
        long: '52.6925',
        id_ride: 1,
      })
      .expect(200)
      .expect('Content-Type', /json/);

    const expected = {
      id: 6,
      label: 'laborum',
      summary: 'Beatae tempore harum omnis.',
      media: uploadPath,
      media_type: 'image',
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
    await supertest(app).delete('/api/v0/pins/3').expect(204);
  });
});

afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});
