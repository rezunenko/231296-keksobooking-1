const request = require(`supertest`);
const server = require(`../src/server`);
const app = server.app;

describe(`GET /api/offers`, () => {
  it(`unknown address shoul rerutn 404`, () => {

    return request(app).get(`/api/offers12334`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`/api/offers should return JSON`, () => {

    return request(app).get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /json/);
  });

  it(`/api/offers/:date should return JSON`, () => {

    return request(app).get(`/api/offers/1519648634770`)
        .set(`Accept`, `application/json`)
        .expect(200);
  });
});


describe(`POST /api/offers`, () => {
  it(`unknown address shoul rerutn 404`, () => {

    return request(app).post(`/api/offers12334`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`/api/offers should return JSON`, () => {

    return request(app).post(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /json/);
  });
});


