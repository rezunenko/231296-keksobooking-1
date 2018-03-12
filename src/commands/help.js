const colors = require(`colors/safe`);

module.exports = {
  name: `help`,
  description: `Show help`,
  execute() {
    console.log(`Доступные команды:`);
    console.log(`${colors.grey(`--help`)}             ${colors.green(`— выводит список доступных команд;`)}`);
    console.log(`${colors.grey(`--author`)}           ${colors.green(`— выводит информацию об авторе приложения;`)}`);
    console.log(`${colors.grey(`--version`)}          ${colors.green(`— выводит информацию о текущей версии приложения;`)}`);
    console.log(`${colors.grey(`--server`)}           ${colors.green(`— запускает сервер на выбранном порту;`)}`);
    console.log(`${colors.grey(`--fill`)}             ${colors.green(`— заполняет базу данных тестовыми данными;`)}`);
    console.log(`${colors.grey(`--description`)}      ${colors.green(`— выводит информацию с описанием проекта;`)}`);
    console.log(`${colors.grey(`--license`)}          ${colors.green(`— выводит лицензионную информацию.`)}`);
  }
};
