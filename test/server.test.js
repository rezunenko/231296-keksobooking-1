const assert = require(`assert`);
const server = require(`../src/server`);
const http = require(`http`);
server.execute();

describe(`Server`, () => {
  it(`should fail or not existing file/folder`, (done) => {
    http.get(`http://127.0.0.1:3000/test.html`, (res) => {
      const {statusCode} = res;
      assert.equal(+statusCode, 404, `Server response not existing file`);
      done();
    });
  });

  it(`url = "/" should return index.html`, (done) => {
    http.get(`http://127.0.0.1:3000`, (res) => {
      const {statusCode} = res;
      const contentType = res.headers[`content-type`].split(`;`)[0];
      if (+statusCode !== 200 || contentType !== `text/html`) {
        assert.fail(`Server response incorrect status or content-type /nStatusCode=${statusCode}  content-type=${contentType}`);
      }
      done();
    });
  });

  it(`url = "css/style.css" should return style.css`, (done) => {
    http.get(`http://127.0.0.1:3000/css/style.css`, (res) => {
      const {statusCode} = res;
      const contentType = res.headers[`content-type`].split(`;`)[0];
      if (+statusCode !== 200 || contentType !== `text/css`) {
        assert.fail(`Server response is incorrect status or content-type /nStatusCode=${statusCode}  content-type=${contentType}`);
      }
      done();
    });
  });

  it(`url = "favicon.ico" should return favicon.ico`, (done) => {
    http.get(`http://127.0.0.1:3000/favicon.ico`, (res) => {
      const {statusCode} = res;
      const contentType = res.headers[`content-type`].split(`;`)[0];
      if (+statusCode !== 200 || contentType !== `image/x-icon`) {
        assert.fail(`Server response is incorrect status or content-type /nStatusCode=${statusCode}  content-type=${contentType}`);
      }
      done();
    });
  });

  it(`url = "img/logo.png" should return logo.png`, (done) => {
    http.get(`http://127.0.0.1:3000/img/logo.png`, (res) => {
      const {statusCode} = res;
      const contentType = res.headers[`content-type`].split(`;`)[0];
      if (+statusCode !== 200 || contentType !== `image/png`) {
        assert.fail(`Server response is incorrect status or content-type /nStatusCode=${statusCode}  content-type=${contentType}`);
      }
      done();
    });
  });
});

server.close();
