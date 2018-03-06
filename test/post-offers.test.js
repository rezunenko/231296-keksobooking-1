const request = require(`supertest`);
const mockOffersRouter = require(`./mock-offers-router`);
const express = require(`express`);
const assert = require(`assert`);
const app = express();

app.use(`/api/offers`, mockOffersRouter);

describe(`POST /api/offers`, () => {
  it(`unknown address shoul rerutn 404`, () => {

    return request(app).post(`/api/offers12334`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`should consume JSON`, () => {
    const testData = {
      title: `Некрасивый негостеприимный и очень ветхий домик с призраками`,
      type: `flat`,
      rooms: `1`,
      price: `15000`,
      address: `Москва, ул.Строителей ...`,
      checkin: `14:00`,
      checkout: `14:00`
    };

    return request(app).post(`/api/offers`).send(testData)
        .expect(200)
        .then((res) => {
          const checkValid = (key) => {
            assert.equal(res.body[key], testData[key]);
          };
          Object.keys(testData).forEach(checkValid);
        });
  });
});


