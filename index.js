const cli = require(`./src/cli`);
require(`./dotend`);
const argv = process.argv.slice(0);
const commands = {
  "--help": require(`./src/commands/help`),
  "--version": require(`./src/commands/version`),
  "--author": require(`./src/commands/author`),
  "--license": require(`./src/commands/license`),
  "--description": require(`./src/commands/description`),
  "--server": require(`./src/server/server`)
};

function handleInitCommands([, , cmd, port]) {
  if (commands[cmd]) {
    commands[cmd].execute(port);
    if (cmd !== `--server`) {
      process.exit(0);
    }
  } else if (!cmd) {
    cli.execute();
  } else {
    console.error(`Неизвестная команда ${cmd}. Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
  }
}

handleInitCommands(argv);
