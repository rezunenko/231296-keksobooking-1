const express = require(`express`);
const logger = require(`../../winston`);
const app = express();
const offerStore = require(`./routes/store`);
const imageStore = require(`./routes/image-store`);
const middleware = require(`./middleware`);
const offersRoute = require(`./routes/offers`)(offerStore, imageStore);
const env = process.env;
const PORT = env.SERVER_PORT || 3000;
const HOSTNAME = env.SERVER_HOST || `localhost`;

app.use(express.static(`static`));
app.use(`/api/offers`, offersRoute);
app.use(middleware.errorHandler);


module.exports = {
  name: `server`,
  description: `Run server`,
  execute(port = PORT, hostname = HOSTNAME) {
    const serverAddress = `http://${hostname}:${port}`;
    app.listen(port, hostname, () => {
      logger.info(`Server running at ${serverAddress}`);
    });
  },
  app
};
