const DATABASE_PORT = 21017;
const url = `mongodb://localhost:${DATABASE_PORT}`;
const {MongoClient} = require(`mongodb`);

module.exports = MongoClient.connect(url)
    .then((client) => client.db(`offers`))
    .catch((err) => {
      console.error(`Failed to connect to MongoDB`, err);
      process.exit(1);
    });
