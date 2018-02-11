const packageInfo = require(`../package.json`);
const colors = require(`colors/safe`);

module.exports = {
  name: `version`,
  description: `Show program's author`,
  execute() {
    console.log(`${colors.grey(`author:`)}      ${colors.green(packageInfo.author)}`);
  }
};
