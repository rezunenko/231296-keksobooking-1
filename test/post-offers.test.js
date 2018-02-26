const request = require(`supertest`);
const server = require(`../src/server`);
const app = server.app;

describe(`POST /api/offers`, () => {
  it(`unknown address shoul rerutn 404`, () => {

    return request(app).post(`/api/offers12334`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`/api/offers must be success`, () => {

    return request(app).post(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200);
  });

  it(`/api/offers/:date/avatar must be success`, () => {

    return request(app).post(`/api/offers/:date/avatar`)
        .set(`Accept`, `application/json`)
        .expect(200);
  });
});


