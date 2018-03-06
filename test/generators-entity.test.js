const assert = require(`assert`);
const {generateEntity} = require(`./generate-entity`);
const {
  HOUSING_NAMES,
  HOUSING_PRICE_RANGE,
  HOUSING_TYPES,
  ROOMS_RANGE,
  GUESTS_RANGE,
  AVAILABLE_TIMES,
  X_RANGE,
  Y_RANGE
} = require(`../src/generator/generator-constants`);

let checkUrl = (str, url) => {

  return str && str.indexOf(url) !== -1 && str.substring(str.indexOf(url)).length > 0;
};

const unique = (arr) => {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let str = arr[i];
    obj[str] = true;
  }

  return Object.keys(obj);
};

describe(`Generate-entity`, () => {
  for (let i = 0; i < 1; i++) {
    const {author, offer, location} = generateEntity();

    describe(`#author, offer, location`, () => {

      it(`author, offer, location are defined`, () => {
        assert.equal(!!author && !!offer && !!location, true, `author, offer, location are not defined`);
      });
    });

    describe(`#author`, () => {

      it(`avatar is correct url`, () => {
        const url = `https://robohash.org/`;
        let isAvatarCorrect = author && author.avatar && checkUrl(author.avatar, url);
        assert.equal(isAvatarCorrect, true, `avatar is incorrect`);
      });
    });

    describe(`#offer`, () => {
      const {title, address, price, type, rooms, guests, checkin, checkout, features, photos} = offer || {};
      const url = `http://o0.github.io/assets/images/tokyo/hotel`;
      let isPhotosArray = photos && (photos instanceof Array);
      let isFeaturesArray = features && (features instanceof Array);
      let isPhotosCorrect = offer.photos.every((item) => checkUrl(item, url));

      it(`title is correct`, () => {
        assert.equal(HOUSING_NAMES.indexOf(title) !== -1, true, `title is incorrect`);
      });

      it(`address is correct`, () => {
        const [x, y] = address.split(`,`);
        assert.equal(x >= X_RANGE.min && x <= X_RANGE.max && y >= Y_RANGE.min && y <= Y_RANGE.max, true, `location is incorrect`);
      });

      it(`price x in [${HOUSING_PRICE_RANGE.min}: ${HOUSING_PRICE_RANGE.max}]`, () => {
        assert.equal(price >= HOUSING_PRICE_RANGE.min && price <= HOUSING_PRICE_RANGE.max, true, `price not in [${HOUSING_PRICE_RANGE.min}: ${HOUSING_PRICE_RANGE.max}]`);
      });

      it(`type is correct`, () => {
        assert.equal(HOUSING_TYPES.indexOf(type) !== -1, true, `type is incorrect`);
      });

      it(`rooms in [${ROOMS_RANGE.min}: ${ROOMS_RANGE.max}]`, () => {
        assert.equal(rooms >= ROOMS_RANGE.min && rooms <= ROOMS_RANGE.max, true, `rooms not in [${ROOMS_RANGE.min}: ${ROOMS_RANGE.max}]`);
      });

      it(`guests in [${GUESTS_RANGE.min}: ${GUESTS_RANGE.max}]`, () => {
        assert.equal(guests >= GUESTS_RANGE.min && guests <= GUESTS_RANGE.max, true, `guests not in [${GUESTS_RANGE.min}: ${GUESTS_RANGE.max}]`);
      });

      it(`checkin in [${AVAILABLE_TIMES.join(`, `)}]`, () => {
        assert.equal(AVAILABLE_TIMES.indexOf(checkin) !== -1, true, `checkin not in [${AVAILABLE_TIMES.min}: ${AVAILABLE_TIMES.max}]`);
      });

      it(`checkout in [${AVAILABLE_TIMES.join(`, `)}]`, () => {
        assert.equal(AVAILABLE_TIMES.indexOf(checkout) !== -1, true, `checkout not in [${AVAILABLE_TIMES.min}: ${AVAILABLE_TIMES.max}]`);
      });

      it(`checkin and checkout are equals`, () => {
        assert.equal(checkin === checkout, true, `checkin and checkout are not equals`);
      });

      it(`features is array`, () => {
        assert.equal(isFeaturesArray, true, `features is not array`);
      });

      it(`features is unique array`, () => {
        assert.equal(features.length === unique(features).length, true, `features is not unique array`);
      });

      it(`photos is array`, () => {
        assert.equal(isPhotosArray, true, `photos is not array`);
      });

      it(`photos is correct url`, () => {
        assert.equal(isPhotosCorrect, true, `photos is incorrect`);
      });
    });

    describe(`#location`, () => {
      const {x, y} = location;

      it(`location x in [${X_RANGE.min}: ${X_RANGE.max}]`, () => {
        assert.equal(x >= X_RANGE.min && x <= X_RANGE.max, true, `location x not in [${X_RANGE.min}: ${X_RANGE.max}]`);
      });

      it(`location y in [${Y_RANGE.min}: ${Y_RANGE.max}]`, () => {
        assert.equal(y >= Y_RANGE.min && y <= Y_RANGE.max, true, `location y not in [${Y_RANGE.min}: ${Y_RANGE.max}]`);
      });
    });
  }
});
