let getRandom = ({max = 0, min = 0, precision = 0}) => {
  let random = Math.random() * (max - min) + min;

  return Math.round(random * Math.pow(10, precision)) / Math.pow(10, precision);
};

let getRandomItem = (arr) => {

  return arr[getRandom({max: arr.length - 1})];
};

function getRandomArraySubset(arr) {
  let subsetLength = getRandom({max: arr.length});
  let subset = [];
  let item = null;

  for (let i = 0; i < subsetLength; i++) {
    item = arr[getRandom({max: arr.length - 1})];
    if (subset.indexOf(item) + 1) {
      i--;
    } else {
      subset.push(item);
    }
  }

  return subset;
}

module.exports = {
  getRandom,
  getRandomItem,
  getRandomArraySubset
};
