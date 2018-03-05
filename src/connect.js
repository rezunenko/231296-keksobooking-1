const DATABASE_PORT = 21017;
const {MongoClient} = require(`mongodb`);
const url = `mongodb://localhost:${DATABASE_PORT}`;
const {getElements} = require(`./commands/generator`);

const connectAndRead = async () => {
  const offers = await getElements(5);
  const client = await MongoClient.connect(url);
  const db = client.db(`offers`);

  const collection = db.collection(`find`);
  await collection.insertMany(offers.data);

  const itemCursor = collection.find({ _id: `5a9d792a6f372c09f088a0ae`});
  // const itemCursor = collection.find({
  //   offer: {
  //     type: `house`
  //   }
  // });
  const items = await itemCursor.limit(2).toArray();
  console.log(items[0]);

  client.close();
};

connectAndRead().catch((err) => {
  throw err;
});
