const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const PORT = 3000;
const HOSTNAME = `127.0.0.1`;
const CONTENT_TYPES = {
  'css': `text/css`,
  'html': `text/html; charset=UTF-8`,
  'jpg': `image/jpeg`,
  'png': `image/png`,
  'svg': `image/svg+xml`,
  'ico': `image/x-icon`
};

const readFile = async (path, res) => {
  const data = await promisify(fs.readFile)(path);
  const arr = path.split(`.`);
  const contentType = arr[arr.length - 1];
  if (!CONTENT_TYPES[contentType]) {
    throw new Error(`Not resolver content-type`);
  }
  res.setHeader(`content-type`, CONTENT_TYPES[contentType]);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const server = http.createServer((req, res) => {
  let path = url.parse(req.url).pathname;
  if (path === `/`) {
    path = `/index.html`;
  }
  const absolutePath = `${process.cwd()}/static${path}`;
  (async () => {
    try {
      const pathStat = await promisify(fs.stat)(absolutePath);
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
  },
  close() {
    server.close();
  }
};
