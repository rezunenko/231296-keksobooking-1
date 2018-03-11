const {NAMES_LIST} = require(`../../generator/generator-constants`);
const {getRandomItem} = require(`../../utils/generators`);
const db = require(`../../database/database`);
const logger = require(`../../../winston`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`offers`);
  collection.createIndex({date: -1}, {unique: true});

  return collection;
};

const getFormatedData = (data) => {

  return {
    "author": {
      "name": getRandomItem(NAMES_LIST),
      "avatar": `api/offers/${data.date}/avatar`,
      "mime-type": data.avatarMimeType
    },
    "offer": {
      "title": data.title,
      "address": data.address,
      "price": data.price,
      "type": data.type,
      "rooms": data.rooms,
      "guests": data.guests,
      "checkin": data.checkin,
      "checkout": data.checkout,
      "features": data.features,
      "description": data.description,
      "photos": []
    },
    "location": {
      "x": data.x,
      "y": data.y
    },
    "date": data.date
  };
};

const toPage = async (cursor, skip, limit) => {
  const data = await (cursor.skip(skip).limit(limit).toArray());
  const formattedData = data.map((item) => getFormatedData(item));
  return {
    data: formattedData,
    skip,
    limit,
    total: await (cursor.count())
  };
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async get(date) {
    const data = await (await this.collection).findOne({date});

    return data ? getFormatedData(data) : null;
  }

  async getAll(skip, limit) {
    const data = await (await this.collection).find();

    return await toPage(data, skip, limit);
  }

  async save(offerData) {
    const collection = await this.collection;
    return collection.insertOne(offerData);
  }
}

module.exports = new OfferStore(setupCollection()
    .catch((err) => logger.error(`Failed to set up "offers" collection`, err)));
