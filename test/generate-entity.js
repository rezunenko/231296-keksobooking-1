const colors = require(`colors/safe`);
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
  MAX_PHOTOS_COUNT,
  PHOTOS_IDS_RANGE,
  AVATARS_RANGE
} = require(`../src/generator/generator-constants`);
const {getRandom, getRandomItem, getRandomArraySubset} = require(`../src/utils/generators`);

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
  execute() {
    console.log(`${colors.grey(`Generated data:`)}`);
    console.log(generateEntity());
  }
};
