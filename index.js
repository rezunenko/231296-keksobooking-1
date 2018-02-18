const argv = process.argv.slice(0);
const commands = {
  "--help": require(`./src/help`),
  "--version": require(`./src/version`),
  "--author": require(`./src/author`),
  "--license": require(`./src/license`),
  "--description": require(`./src/description`),
  "--generate": require(`./src/generator`)
};

let onError = (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
};

function handleInitCommands([, , cmd]) {
  if (commands[cmd]) {
    commands[cmd].execute().catch(onError);
  } else if (!cmd) {
    console.log(`Привет пользователь! Эта программа будет запускать сервер «Booking». Автор: Кекс.`);
  } else {
    console.error(`Неизвестная команда ${cmd}. Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
  }
}

handleInitCommands(argv);
