const request = require(`supertest`);
const server = require(`../src/server/server`);
const app = server.app;

describe(`Server`, () => {
  it(`should fail or not existing file/folder`, () => {

    return request(app).get(`/test.html`)
        .expect(404);
  });

  it(`url = "/" should return index.html`, () => {

    return request(app).get(`/`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /html/);
  });

  it(`url = "/css/style.css" should return style.css`, () => {

    return request(app).get(`/css/style.css`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /css/);
  });

  it(`url = "favicon.ico" should return favicon.ico`, () => {

    return request(app).get(`/favicon.ico`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /x-icon/);
  });

  it(`url = "img/logo.png" should return logo.png`, () => {

    return request(app).get(`/img/logo.png`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /png/);
  });
});

