const request = require(`supertest`);
const mockOffersRouter = require(`./mock-offers-router`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

describe(`GET /api/offers`, () => {
  it(`unknown address should rerutn 404`, () => {

    return request(app).get(`/api/offers12334`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`/api/offers?skip=0&limit=3 should return JSON`, () => {

    return request(app).get(`/api/offers?skip=0&limit=3`)
        .expect(200)
        .expect(`Content-type`, /json/);
  });

  it(`/api/offers?skip=0&limit=asdf should return BAD REQUEST`, () => {

    return request(app).get(`/api/offers?skip=0&limit=asdf`)
        .expect(400);
  });

  it(`/api/offers/:date should return JSON`, () => {

    return request(app).get(`/api/offers/1520243732068`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`/api/offers/:date/avatar should return 400, because :date incorrect`, () => {

    return request(app).get(`/api/offers/1519648634770/avatar`)
        .set(`Accept`, `application/json`)
        .expect(400);
  });
});


