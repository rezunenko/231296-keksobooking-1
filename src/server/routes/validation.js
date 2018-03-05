const {textRange, isImage, oneOf, anyOf, inRange, unique, isTimeFormat} = require(`../../utils/assertion`);
const {getRandomItem} = require(`../../utils/generators`);
const {
  TITLE_LENGTH_LIMIT,
  HOUSING_TYPES,
  ROOMS_RANGE,
  HOUSING_PRICE_RANGE,
  ADDRESS_LENGTH_LIMIT,
  FEATURES,
  DESCRIPTION_LENGTH_LIMIT,
  NAMES_LIST,
  NAMES_LENGTH_LIMIT
} = require(`../../generator/generator-constants`);

const schema = {
  title: {
    required: true,
    converter(val) {
      return val.toString().trim();
    },
    assertions: [
      textRange(TITLE_LENGTH_LIMIT.min, TITLE_LENGTH_LIMIT.max)
    ]
  },
  type: {
    required: true,
    assertions: [
      oneOf(HOUSING_TYPES)
    ]
  },
  rooms: {
    required: true,
    assertions: [
      inRange(ROOMS_RANGE.min, ROOMS_RANGE.max)
    ]
  },
  price: {
    required: true,
    assertions: [
      inRange(HOUSING_PRICE_RANGE.min, HOUSING_PRICE_RANGE.max)
    ]
  },
  address: {
    required: true,
    assertions: [
      textRange(ADDRESS_LENGTH_LIMIT.min, ADDRESS_LENGTH_LIMIT.max)
    ]
  },
  checkin: {
    required: true,
    assertions: [
      isTimeFormat()
    ]
  },
  checkout: {
    required: true,
    assertions: [
      isTimeFormat()
    ]
  },
  features: {
    required: false,
    assertions: [
      anyOf(FEATURES),
      unique()
    ]
  },
  description: {
    required: false,
    assertions: [
      textRange(0, DESCRIPTION_LENGTH_LIMIT)
    ]
  },
  avatar: {
    required: false,
    assertions: [
      isImage()
    ]
  },
  preview: {
    required: false,
    assertions: [
      isImage()
    ]
  },
  name: {
    required: false,
    converter(val) {
      if (val) {
        return val.trim();
      } else {
        return getRandomItem(NAMES_LIST);
      }
    },
    assertions: [
      textRange(NAMES_LENGTH_LIMIT.min, NAMES_LENGTH_LIMIT.max)
    ]
  }
};

module.exports = schema;
