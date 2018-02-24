const colors = require(`colors/safe`);
const {getRandom, getRandomItem, getRandomArraySubset} = require(`../service/generators`);

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

let getRandomPhotos = () => {
  const photosCount = getRandom({max: MAX_PHOTOS_COUNT});
  let photos = {};
  for (let i = 0; i < photosCount;) {
    let id = getRandom(PHOTOS_IDS_RANGE);
    if (!photos[id]) {
      photos[id] = `http://o0.github.io/assets/images/tokyo/hotel${id}.jpg`;
      i++;
    }
  }

  return Object.keys(photos).map((key) => photos[key]);
};

let generateEntity = () => {
  const time = getRandomItem(AVAILABLE_TIMES);
  const x = getRandom(X_RANGE);
  const y = getRandom(Y_RANGE);

  return {
    "author": {
      "avatar": `https://robohash.org/${getRandom(AVATARS_RANGE)}`
    },
    "offer": {
      "title": getRandomItem(HOUSING_NAMES),
      "address": `${x},${y}`,
      "price": getRandom(HOUSING_PRICE_RANGE),
      "type": getRandomItem(HOUSING_TYPES),
      "rooms": getRandom(ROOMS_RANGE),
      "guests": getRandom(GUESTS_RANGE),
      "checkin": time,
      "checkout": time,
      "features": getRandomArraySubset(FEATURES),
      "description": ``,
      "photos": getRandomPhotos()
    },
    "location": {
      "x": x,
      "y": y
    }
  };
};

module.exports = {
  name: `Data generator`,
  description: `Generate point's data`,
  generateEntity,
  params: {
    HOUSING_NAMES,
    HOUSING_PRICE_RANGE,
    HOUSING_TYPES,
    ROOMS_RANGE,
    GUESTS_RANGE,
    AVAILABLE_TIMES,
    FEATURES,
    X_RANGE,
    Y_RANGE
  },
  execute() {
    console.log(`${colors.grey(`Generated data:`)}`);
    console.log(generateEntity());
  }
};
