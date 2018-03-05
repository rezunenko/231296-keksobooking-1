const request = require(`supertest`);
const server = require(`../src/server`);
const assert = require(`assert`);
const app = server.app;

describe(`GET /api/offers`, () => {
  it(`unknown address shoul rerutn 404`, () => {

    return request(app).get(`/api/offers12334`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`/api/offers?skip=0&limit=3 should return JSON`, () => {

    return request(app).get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /json/)
        .then((res) => {
          console.log(res);
          const offers = res.body;
          assert.equal(offers.length, 3);
        });
  });

  it(`/api/offers/:date should return JSON`, () => {

    return request(app).get(`/api/offers/1519648634770`)
        .set(`Accept`, `application/json`)
        .expect(200);
  });

  it(`/api/offers/:date/avatar should return 404, because :date incorrect`, () => {

    return request(app).get(`/api/offers/1519648634770/avatar`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });
});


