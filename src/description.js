const packageInfo = require(`../package.json`);
const colors = require(`colors/safe`);

module.exports = {
  name: `version`,
  description: `Show program's description`,
  execute() {
    console.log(`${colors.grey(`description:`)}      ${colors.green(packageInfo.description)}`);
  }
};
