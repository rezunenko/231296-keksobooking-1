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

    return request(app)
        .post(`/api/offers`)
        .field(`title`, testData.title)
        .field(`type`, testData.type)
        .field(`rooms`, testData.rooms)
        .field(`price`, testData.price)
        .field(`address`, testData.address)
        .field(`checkin`, testData.checkin)
        .field(`checkout`, testData.checkout)
        .expect(200);
  });

  it(`save avatar`, () => {
    const testData = {
      title: `Некрасивый негостеприимный и очень ветхий домик с призраками`,
      type: `flat`,
      rooms: `1`,
      price: `15000`,
      address: `Москва, ул.Строителей ...`,
      checkin: `14:00`,
      checkout: `14:00`
    };

    return request(app)
        .post(`/api/offers`)
        .field(`title`, testData.title)
        .field(`type`, testData.type)
        .field(`rooms`, testData.rooms)
        .field(`price`, testData.price)
        .field(`address`, testData.address)
        .field(`checkin`, testData.checkin)
        .field(`checkout`, testData.checkout)
        .attach(`avatar`, `./static/img/logo.png`)
        .expect(200)
        .then((res) => {
          const checkValid = (key) => {
            assert.equal(res.body[key], testData[key]);
          };
          Object.keys(testData).forEach(checkValid);
          assert.equal(res.body[`avatarMimeType`], `image/png`);
        });
  });

  it(`save photos`, () => {
    const testData = {
      title: `Некрасивый негостеприимный и очень ветхий домик с призраками`,
      type: `flat`,
      rooms: `1`,
      price: `15000`,
      address: `Москва, ул.Строителей ...`,
      checkin: `14:00`,
      checkout: `14:00`
    };

    return request(app)
        .post(`/api/offers`)
        .field(`title`, testData.title)
        .field(`type`, testData.type)
        .field(`rooms`, testData.rooms)
        .field(`price`, testData.price)
        .field(`address`, testData.address)
        .field(`checkin`, testData.checkin)
        .field(`checkout`, testData.checkout)
        .attach(`photos`, `./static/img/logo.png`)
        .expect(200)
        .then((res) => {
          const checkValid = (key) => {
            assert.equal(res.body[key], testData[key]);
          };
          Object.keys(testData).forEach(checkValid);
          assert.equal(res.body.photos[0][`mimetype`], `image/png`);
        });
  });
});


