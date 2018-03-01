const {getElements} = require(`./generator`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const app = express();
const PORT = 3000;
const HOSTNAME = `localhost`;
const upload = multer({storage: multer.memoryStorage()});

app.use(express.static(`static`));
app.use(bodyParser.json());

app.get(`/api/offers/:date`, (req, res) => {
  const offers = getElements(5);
  const date = +req.params[`date`];
  const filteredData = offers.data.find((item) => item.date === date);

  res.send(filteredData);
});

app.get(`/api/offers`, (req, res) => {
  const {skip, limit} = req.query;
  const offers = getElements(5, +skip, +limit);
  res.send(offers);
});

app.get(`/api/offers/:date/avatar`, (req, res) => {
  const offers = getElements(5);
  const date = +req.params[`date`];
  const filteredData = offers.data.find((item) => item.date === date);
  if (!filteredData) {
    res.status(404).send(`Offer is undefined`);
  }

  res.send(filteredData.author.avatar);
});

app.post(`/api/offers`, upload.none(), (req, res) => {
  // TODO сделать корректную обработку запроса
  res.send(req.body);
});

app.post(`/api/offers/:date/avatar`, upload.none(), (req, res) => {
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
  app
};
