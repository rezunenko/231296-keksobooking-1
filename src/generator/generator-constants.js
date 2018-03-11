const HOUSING_NAMES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];

const HOUSING_TYPES = [`flat`, `house`, `bungalo`, `palace`];
const AVAILABLE_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const HOUSING_PRICE_RANGE = {max: 1000000, min: 1000, precision: -3};
const ROOMS_RANGE = {max: 5, min: 1};
const GUESTS_RANGE = {max: 4, min: 1};
const X_RANGE = {max: 900, min: 300};
const Y_RANGE = {max: 500, min: 150};
const MAX_PHOTOS_COUNT = 5;
const PHOTOS_IDS_RANGE = {max: 100, min: 1};
const AVATARS_RANGE = {max: 9999999999, min: 1};
const TITLE_LENGTH_LIMIT = {min: 20, max: 140};
const ADDRESS_LENGTH_LIMIT = {min: 5, max: 100};
const DESCRIPTION_LENGTH_LIMIT = 100;
const NAMES_LIST = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];
const NAMES_LENGTH_LIMIT = {min: 2, max: 30};

module.exports = {
  name: `Data generator`,
  description: `Generate point's data`,
  HOUSING_NAMES,
  HOUSING_PRICE_RANGE,
  HOUSING_TYPES,
  ROOMS_RANGE,
  GUESTS_RANGE,
  AVAILABLE_TIMES,
  FEATURES,
  X_RANGE,
  Y_RANGE,
  MAX_PHOTOS_COUNT,
  PHOTOS_IDS_RANGE,
  AVATARS_RANGE,
  TITLE_LENGTH_LIMIT,
  ADDRESS_LENGTH_LIMIT,
  DESCRIPTION_LENGTH_LIMIT,
  NAMES_LIST,
  NAMES_LENGTH_LIMIT
};
