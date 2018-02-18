const colors = require(`colors/safe`);
const {generateEntity} = require(`./generator/generate-entity`);
const fs = require(`fs`);
const fileWriteOptions = {encoding: `utf8`, mode: 0o644};

module.exports = {
  name: `Data generator`,
  description: `Generate point's data`,
  generateEntity,
  execute(filePath = `${process.cwd()}/data.json`, cb) {
    const data = generateEntity();
    fs.writeFile(filePath, JSON.stringify(data), fileWriteOptions, cb);
  }
};
