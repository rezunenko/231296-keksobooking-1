const express = require(`express`);
const app = express();
const offerStore = require(`./routes/store`);
const imageStore = require(`./routes/image-store`);
const offersRoute = require(`./routes/offers`)(offerStore, imageStore);
const PORT = 3000;
const HOSTNAME = `localhost`;

app.use(express.static(`static`));
app.use(`/api/offers`, offersRoute);

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
