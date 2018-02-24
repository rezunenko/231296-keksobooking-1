const colors = require(`colors/safe`);

module.exports = {
  name: `help`,
  description: `Show help`,
  execute() {
    console.log(`Доступные команды:`);
    console.log(`${colors.grey(`--author`)}           ${colors.green(`— печатает информацию о авторе;`)}`);
    console.log(`${colors.grey(`--description`)}      ${colors.green(`— печатает описание проекта;`)}`);
    console.log(`${colors.grey(`--generation`)}       ${colors.green(`— генерирует данные;`)}`);
    console.log(`${colors.grey(`--help`)}             ${colors.green(`— печатает этот текст;`)}`);
    console.log(`${colors.grey(`--license`)}          ${colors.green(`— печатает лицензионную информацию;`)}`);
    console.log(`${colors.grey(`--server`)}           ${colors.green(`— запускает сервер (можно указать порт, по-умолчанию 3000);`)}`);
    console.log(`${colors.grey(`--version`)}          ${colors.green(`— печатает версию приложения;`)}`);
  }
};
