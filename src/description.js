const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Show program's description`,
  execute() {
    console.log(`description: ${packageInfo.description}`);
  }
};
