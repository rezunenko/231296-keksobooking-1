const showDotEndnfo = require(`../utils/dotend`);
const express = require(`express`);
const logger = require(`../winston`);
const app = express();
const offerStore = require(`./offer/store`);
const imageStore = require(`./image/store`)(`avatars`);
const photoStore = require(`./image/store`)(`photos`);
const middleware = require(`./middleware/index`);
const offersRoute = require(`./offer/route`)(offerStore, imageStore, photoStore);
const NotImplementedError = require(`./errors/not-implemented-error`);
const env = process.env;
const PORT = env.SERVER_PORT || 3000;
const HOSTNAME = env.SERVER_HOST || `localhost`;

app.use(express.static(`static`));
app.use(`/api/offers`, offersRoute);
app.all(`*`, function (req, res, next) {
  logger.error(`Not implemented`);
  const err = new NotImplementedError();
  next(err);
});
app.use(middleware.clientErrorHandler);
app.use(middleware.errorHandler);

module.exports = {
  name: `server`,
  description: `Run server`,
  execute(port = PORT, hostname = HOSTNAME) {
    const serverAddress = `http://${hostname}:${port}`;
    showDotEndnfo();
    app.listen(port, hostname, () => {
      logger.info(`Server running at ${serverAddress}`);
    });
  },
  app
};
