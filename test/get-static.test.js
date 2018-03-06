const request = require(`supertest`);
const express = require(`express`);
const appStatic = express();

appStatic.use(express.static(`static`));

describe(`Server`, () => {
  it(`should fail or not existing file/folder`, () => {

    return request(appStatic).get(`/test.html`)
        .expect(404);
  });

  it(`url = "/" should return index.html`, () => {

    return request(appStatic).get(`/`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /html/);
  });

  it(`url = "/css/style.css" should return style.css`, () => {

    return request(appStatic).get(`/css/style.css`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /css/);
  });

  it(`url = "favicon.ico" should return favicon.ico`, () => {

    return request(appStatic).get(`/favicon.ico`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /x-icon/);
  });

  it(`url = "img/logo.png" should return logo.png`, () => {

    return request(appStatic).get(`/img/logo.png`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-type`, /png/);
  });
});
