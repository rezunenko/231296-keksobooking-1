const {generateElements} = require(`./generator`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const app = express();
const PORT = 3000;
const HOSTNAME = `localhost`;

app.use(express.static(`static`));
app.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const offers = generateElements(5);

app.get(`/api/offers/:date`, (req, res) => {
  const date = +req.params[`date`];
  const filteredData = offers.data.find((item) => item.date === date);

  res.send(filteredData);
});

app.get(`/api/offers`, (req, res) => {
  res.send(offers);
});

app.post(`/api/offers`, upload.none(), (req, res) => {
  // TODO сделать корректную обработку запроса
  res.send(req.body);
});

module.exports = {
  name: `server`,
  description: `Run server`,
  execute(port = PORT, hostname = HOSTNAME) {
    const serverAddress = `http://${hostname}:${port}`;
    app.listen(port, hostname, () => {
      console.log(`Server running at ${serverAddress}`);
    });
  },
  close() {
    app.close();
  }
};
