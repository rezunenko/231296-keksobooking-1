const logger = require(`./src/winston`);
const argv = process.argv.slice(0);
const commands = {
  "--help": require(`./src/commands/help`),
  "--author": require(`./src/commands/author`),
  "--version": require(`./src/commands/version`),
  "--server": require(`./src/server/server`),
  "--fill": require(`./src/commands/fill`),
  "--license": require(`./src/commands/license`),
  "--description": require(`./src/commands/description`)
};

function handleInitCommands([, , cmd, port]) {
  if (commands[cmd]) {
    commands[cmd].execute(port);
    if (cmd !== `--server` && cmd !== `--fill`) {
      process.exit(0);
    }
  } else {
    logger.log(`verbose`, `Неизвестная команда ${cmd}. Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
  }
}

handleInitCommands(argv);
