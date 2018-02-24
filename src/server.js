const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const { promisify } = require(`util`);
const PORT = 3000;
const HOSTNAME = `127.0.0.1`;
const CONTENT_TYPES = {
  'css': `text/css`,
  'html': `text/html; charset=UTF-8`,
  'jpg': `image/jpeg`,
  'ico': `image/x-icon`
};

const readFile = async (path, res) => {
  const data = await promisify(fs.readFile);
  res.setHeader(`content-type`, `text/plain`);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const server = http.createServer((req, res) => {
  const absolutePath = `${__dirname}/static/${url.parse(req.url).pathname}`;
  console.log(absolutePath);
  (async () => {
    try {
      const pathStat = await promisify(fs.stat)(absolutePath);
      console.log(pathStat);
      if (pathStat.isDirectory()) {
        throw new Error(`Not found file`);
      }

      await readFile(absolutePath, res);
    } catch (err) {
      res.writeHead(404, `Not found`);
      res.end();
    }

  })().catch((err) => {
    res.writeHead(500, err.message, {
      'content-type': `text/plain`
    });
    res.end(err.message);
  });
});

module.exports = {
  name: `server`,
  description: `Run server`,
  execute(port = PORT, hostname = HOSTNAME) {
    const serverAddress = `http://${hostname}:${port}`;
    console.log(serverAddress);
    server.listen(port, hostname, () => {
      console.log(`Server running at ${serverAddress}`);
    });
  }
};
