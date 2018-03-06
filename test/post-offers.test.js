const request = require(`supertest`);
// const mockOffersRouter = require(`./mock-offers-router`);
const express = require(`express`);
const app1 = express();

// app1.use(`/api/offers`, mockOffersRouter);

describe(`POST /api/offers`, () => {
  it(`unknown address shoul rerutn 404`, () => {

    return request(app1).post(`/api/offers12334`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`should consume JSON`, () => {
    return request(app1).post(`/api/offers`).send({
      title: `Некрасивый негостеприимный и очень ветхий домик с призраками`,
      type: `flat`,
      rooms: `1`,
      price: `15000`,
      address: `Москва, ул.Строителей ...`,
      checkin: `14:00`,
      checkout: `14:00`
    })
        .expect(200, {
          title: `Некрасивый негостеприимный и очень ветхий домик с призраками`,
          type: `flat`,
          rooms: `1`,
          price: `15000`,
          address: `Москва, ул.Строителей ...`,
          checkin: `14:00`,
          checkout: `14:00`
        });
  });
  //
  // it(`should consume form-data`, () => {
  //   return request(app).post(`/api/offers`)
  //       .field(`title`, `Некрасивый негостеприимный и очень ветхий домик с призраками`)
  //       .field(`type`, `flat`)
  //       .field(`rooms`, `1`)
  //       .field(`price`, `15000`)
  //       .field(`address`, `Москва, ул.Строителей ...`)
  //       .field(`checkin`, `14:00`)
  //       .field(`checkout`, `14:00`)
  //       .expect(200, {
  //         title: `Некрасивый негостеприимный и очень ветхий домик с призраками`,
  //         type: `flat`,
  //         rooms: `1`,
  //         price: `15000`,
  //         address: `Москва, ул.Строителей ...`,
  //         checkin: `14:00`,
  //         checkout: `14:00`
  //       });
  // });
});


