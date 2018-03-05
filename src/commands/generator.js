const {generateEntity} = require(`../generator/generate-entity`);
const fs = require(`fs`);
const fileWriteOptions = {encoding: `utf8`, mode: 0o644};
const generateElements = (quantity) => {
  const list = [];
  for (let i = 0; i < quantity; i++) {
    list.push(generateEntity());
  }

  return list;
};
const MAX_ELEMENT_COUNT = 20;
const elements = generateElements(MAX_ELEMENT_COUNT);
const getElements = (quantity, skip = 0, limit = MAX_ELEMENT_COUNT) => {
  const startIndex = skip ? +skip - 1 : 0;
  const endIndex = ((skip + quantity <= limit) ? skip + quantity : limit);
  const res = {
    "data": elements.slice(startIndex, endIndex),
    "skip": skip,
    "limit": limit,
    "total": quantity
  };
  return res;
};

module.exports = {
  name: `Data generator`,
  description: `Generate point's data`,
  generateEntity,
  generateElements,
  getElements,
  execute(filePath = `data.json`, options = {}) {
    const data = generateElements(options.quantity || 1);
    return new Promise((res, rej) => {
      console.log(`File ${process.cwd()}/${filePath}`);
      fs.writeFile(`${process.cwd()}/${filePath}`, JSON.stringify(data), fileWriteOptions, (err) => {
        if (err) {
          return rej(err);
        }

        return res();
      });
    });
  }
};
