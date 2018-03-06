const env = process.env;
const DATABASE_PORT = env.DB_PORT || 21017;
const url = `mongodb://${env.DB_HOST}:${DATABASE_PORT}`;
const {MongoClient} = require(`mongodb`);

module.exports = MongoClient.connect(url)
    .then((client) => client.db(`offers`))
    .catch((err) => {
      console.error(`Failed to connect to MongoDB`, err);
      process.exit(1);
    });
