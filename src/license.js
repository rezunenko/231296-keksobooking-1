const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Show license`,
  execute() {
    console.log(`license: ${packageInfo.license}`);
  }
};
