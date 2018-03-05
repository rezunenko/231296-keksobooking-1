const express = require(`express`);
const app = express();
const offersRoute = require(`../routes/offers`);
const PORT = 3000;
const HOSTNAME = `localhost`;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR = 500;

app.use(express.static(`static`));
app.use(`api/offers`, offersRoute);

// Handling 404
app.use(function (req, res) {
  res.status(NOT_FOUND_CODE).send(`Page not found. Error ${NOT_FOUND_CODE}`);
});

// Handling 500
app.use(function (error, req, res) {
  res.status(INTERNAL_SERVER_ERROR).send(`Internal Server Error ${INTERNAL_SERVER_ERROR}`);
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
