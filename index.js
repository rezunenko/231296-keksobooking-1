const cli = require(`./src/cli`);
const argv = process.argv.slice(0);
const commands = {
  "--help": require(`./src/help`),
  "--version": require(`./src/version`),
  "--author": require(`./src/author`),
  "--license": require(`./src/license`),
  "--description": require(`./src/description`),
  "--generate": require(`./src/generator`),
  "--server": require(`./src/server`)
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
