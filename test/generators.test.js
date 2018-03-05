const assert = require(`assert`);
const {getRandom, getRandomItem, getRandomArraySubset} = require(`../src/utils/generators`);

describe(`Generators`, () => {
  describe(`#getRandom()`, () => {
    let checkFunction = (range) => {
      const {max = 0, min = 0} = range;
      let isChecked = true;
      for (let i = 0; i < 1000; i++) {
        let result = getRandom(range);
        if (result < min || result > max) {
          isChecked = false;
          break;
        }
      }

      return isChecked;
    };
    it(`getRandom`, () => {
      assert.ok(checkFunction({max: 10, min: 0}), `getRandom({max:10, min:0}) return incorrect value`);
      assert.ok(checkFunction({max: 0, min: 0}), `getRandom({max:0, min:0}) return incorrect value`);
      assert.ok(checkFunction({max: 0, min: -10}), `getRandom({max:0, min:-10}) return incorrect value`);
      assert.ok(checkFunction({max: 10, min: -10}), `getRandom({max:10, min:10}) return incorrect value`);
      assert.ok(checkFunction({max: -5, min: -10}), `getRandom({max:-5, min:-10}) return incorrect value`);
      assert.ok(checkFunction({max: 10, min: 5}), `getRandom({max:10, min:5}) return incorrect value`);
    });
  });

  describe(`#getRandomItem()`, () => {
    it(`getRandomItem`, () => {
      const arr = [`a`, `b`, `c`, `d`, `e`, `f`];
      let returnIncorrectValue = false;
      let temp = [];
      for (let i = 0; i < 1000; i++) {
        let result = getRandomItem(arr);
        if (arr.indexOf(result) === -1) {
          returnIncorrectValue = false;
          break;
        }

        if (temp.indexOf(result) === -1) {
          temp.push(result);
        }
      }
      let notFullCoverage = temp.length !== arr.length;

      assert.equal(returnIncorrectValue, false, `getRandomItem return incorrect values`);
      assert.equal(notFullCoverage, false, `getRandomItem has not full coverage`);
    });
  });

  describe(`#getRandomArraySubset()`, () => {
    const unique = (arr) => {
      let obj = {};

      for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        obj[str] = true;
      }

      return Object.keys(obj);
    };

    it(`getRandomArraySubset`, () => {
      const arr = [`a`, `b`, `c`, `d`, `e`, `f`];
      let returnIncorrectArray = false;
      let returnNotUniqueValue = false;
      for (let i = 0; i < 1000; i++) {
        let resultArr = getRandomArraySubset(arr);
        if (arr.length < resultArr.length) {
          returnIncorrectArray = true;
          break;
        }

        if (resultArr.length !== unique(resultArr).length) {
          returnNotUniqueValue = true;
          break;
        }
      }

      assert.equal(returnIncorrectArray, false, `getRandomArraySubset return incorrect array length`);
      assert.equal(returnNotUniqueValue, false, `getRandomArraySubset return non unique values`);
    });
  });
});
