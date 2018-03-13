const offerStore = require(`../server/offer/store`);
const BadRequestError = require(`../server/errors/bad-request-error`);
const {validateSchema} = require(`../utils/validator`);
const createStreamFromBuffer = require(`../utils/stream-from-buffer`);
const offerSchema = require(`../server/offer/validation`);
const logger = require(`../winston`);
const {getRandom, getRandomItem, getRandomArraySubset} = require(`../../src/utils/generators`);
const imageStore = require(`../server/image/store`)(`avatars`);
const fs = require(`fs`);
const TEST_AVATARS_COUNT = 8;
const TEST_AVATAR_FIEST_INDEX = 1;
const {
  HOUSING_NAMES,
  HOUSING_PRICE_RANGE,
  HOUSING_TYPES,
  ROOMS_RANGE,
  GUESTS_RANGE,
  AVAILABLE_TIMES,
  FEATURES,
  X_RANGE,
  Y_RANGE,
  NAMES_LIST
} = require(`../generator/generator-constants`);

let generateEntity = () => {
  const time = getRandomItem(AVAILABLE_TIMES);
  const x = getRandom(X_RANGE);
  const y = getRandom(Y_RANGE);

  return {
    "name": getRandomItem(NAMES_LIST),
    "title": getRandomItem(HOUSING_NAMES),
    "address": `${x},${y}`,
    "description": ``,
    "price": getRandom(HOUSING_PRICE_RANGE),
    "type": getRandomItem(HOUSING_TYPES),
    "rooms": getRandom(ROOMS_RANGE),
    "guests": getRandom(GUESTS_RANGE),
    "checkin": time,
    "checkout": time,
    "features": getRandomArraySubset(FEATURES),
    "x": x,
    "y": y
  };
};

const generateElements = (quantity) => {
  const list = [];
  for (let i = 0; i < quantity; i++) {
    list.push(generateEntity());
  }

  return list;
};

const saveOffers = async (quantity) => {
  const offers = generateElements(quantity);
  let time = new Date().getTime();

  for (let item of offers) {
    const errors = validateSchema(item, offerSchema);

    if (errors.length > 0) {
      logger.error(errors);
      throw new BadRequestError(errors);
    }

    item.date = time++;

    const filename = `user0${getRandom({max: TEST_AVATARS_COUNT, min: TEST_AVATAR_FIEST_INDEX})}`;
    let avatar = fs.readFileSync(`${process.cwd()}/static/img/avatars/${filename}.png`);
    if (avatar) {
      await
      imageStore.save(item.date, createStreamFromBuffer(avatar));
      item.avatar = `api/offers/${item.date}/avatar`;
      item.avatarMimeType = `image/png`;
    }

    await offerStore.save(item);
  }
};

module.exports = {
  name: `fill`,
  description: `Fill database`,
  generateEntity,
  execute: async (quantity = 5) => {
    await saveOffers(quantity);
    process.exit(0);
  }
};
