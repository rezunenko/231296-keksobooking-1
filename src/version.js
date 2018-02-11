const packageInfo = require(`../package.json`);
const colors = require(`colors/safe`);

module.exports = {
  name: `version`,
  description: `Show version program`,
  execute() {
    const version = packageInfo.version.split(`.`);
    console.log(`v${colors.red(version[0])}.${colors.green(version[1])}.${colors.blue(version[2])}`);
  }
};
