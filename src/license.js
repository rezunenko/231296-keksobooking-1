const packageInfo = require(`../package.json`);
const colors = require(`colors/safe`);

module.exports = {
  name: `version`,
  description: `Show license`,
  execute() {
    console.log(`${colors.grey(`license:`)}      ${colors.green(packageInfo.license)}`);
  }
};
