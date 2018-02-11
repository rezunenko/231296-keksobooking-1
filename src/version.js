const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Show version program`,
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
