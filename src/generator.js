const {generateEntity} = require(`./generator/generate-entity`);
const fs = require(`fs`);
const fileWriteOptions = {encoding: `utf8`, mode: 0o644};


const generateElements = (quantity) => {
  const list = [];
  for (let i = 0; i < quantity; i++) {
    list.push(generateEntity());
  }
  return list;
};

module.exports = {
  name: `Data generator`,
  description: `Generate point's data`,
  generateEntity,
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
