const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Show program's author`,
  execute() {
    console.log(`author: ${packageInfo.author}`);
  }
};
