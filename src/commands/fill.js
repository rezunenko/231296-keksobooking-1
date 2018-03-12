const offerStore = require(`../server/routes/store`);
const ValidationError = require(`../server/errors/validation-error`);
const {validateSchema} = require(`../utils/validator`);
const offerSchema = require(`../server/routes/validation`);
const logger = require(`../../winston`);
const {getRandom, getRandomItem, getRandomArraySubset} = require(`../../src/utils/generators`);
// const imageStore = require(`../server/routes/image-store`);
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

module.exports = {
  name: `fill`,
  description: `Fill database`,
  generateEntity,
  execute: async (quantity = 5) => {
    const offers = generateElements(quantity);

    for (let item of offers) {
      const errors = validateSchema(item, offerSchema);

      if (errors.length > 0) {
        logger.error(errors);
        throw new ValidationError(errors);
      }

      item.date = new Date().getTime();
      await offerStore.save(item);
    }

    process.exit(0);
  }
};
