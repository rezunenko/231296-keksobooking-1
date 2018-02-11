module.exports = {
  name: `help`,
  description: `Show help`,
  execute() {
    console.log(`Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;`);
  }
};
