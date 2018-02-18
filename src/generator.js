const colors = require(`colors/safe`);
const {generateEntity} = require(`./generator/generate-entity`);

module.exports = {
  name: `Data generator`,
  description: `Generate point's data`,
  generateEntity,
  execute() {
    console.log(`${colors.grey(`Generated data:`)}`);
    console.log(generateEntity());
  }
};
