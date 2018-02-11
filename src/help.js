const colors = require(`colors/safe`);

module.exports = {
  name: `help`,
  description: `Show help`,
  execute() {
    console.log(`Доступные команды:`);
    console.log(`${colors.grey(`--help`)}      ${colors.green(`— печатает этот текст;`)}`);
    console.log(`${colors.grey(`--version`)}   ${colors.green(`— печатает версию приложения;`)}`);
  }
};
