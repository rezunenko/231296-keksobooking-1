const APP_VERSION = `v0.0.1`;
const argv = process.argv.slice(0);

function handleInitCommands([, , cmd]) {
  cmd = cmd ? cmd : null;

  switch (cmd) {
    case `--version`:
      console.log(APP_VERSION);
      break;
    case `--help`:
      console.log(`Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;`);
      break;
    case null:
      console.log(`Привет пользователь! Эта программа будет запускать сервер «Booking». Автор: Кекс.`);
      break;
    default:
      console.error(`Неизвестная команда ${cmd}. Чтобы прочитать правила использования приложения, наберите "--help"`);
      process.exit(1);
  }
}

handleInitCommands(argv);
