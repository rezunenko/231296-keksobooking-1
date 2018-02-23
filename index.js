const readline = require(`readline`);
const util = require(`util`);
const fs = require(`fs`);
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `LN>`
});


const generateData = () => new Promise((resolve, reject) => {
  rl.question(`Желаете сгенерировать данные? (y/n)?`,
      (answer) => answer.toLowerCase() === `y` ? resolve() : reject(`Геренация данных отменена`));
});

const getQuantity = () => new Promise((resolve, reject) => {
  rl.question(`Количество элементов: `, (quantity) => {
    if (Number.isInteger(+quantity) && quantity > 0) {
      resolve({quantity});
    } else {
      reject(`Отмена ввода количества элементов`);
    }
  });
});

const getFilePath = (userAnswer) => new Promise((resolve) => {
  rl.question(`Укажите путь к файлу: `, (path) => {
    userAnswer.path = path ? `/${path.replace(`\\`, `//`)}` : `/keksobooking.json`;
    resolve(userAnswer);
  });
});

const getFileName = (userAnswer) => new Promise((resolve, reject) => {
  fs.exists(userAnswer.path, (exists) => exists
    ? rl.question(`Файл существует, перезаписать? (y/n)`, (answer) => answer === `y` ? resolve(userAnswer) : reject(`Отмена перезаписи`))
    : resolve(userAnswer)
  );
});

const createFile = (userAnswer) => {

  return commands[`--generate`].execute(userAnswer.path, {quantity: userAnswer.quantity});
};

function handleInitCommands([, , cmd]) {
  if (commands[cmd]) {
    commands[cmd].execute().catch(onError);
  } else if (!cmd) {
    generateData()
        .then(getQuantity)
        .then(getFilePath)
        .then(getFileName)
        .then(createFile)
        .then(() => console.log(`file created`))
        .catch((err) => {
          console.error(err);
        })
        .then(() => rl.close());

  } else {
    console.error(`Неизвестная команда ${cmd}. Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
  }
}

handleInitCommands(argv);
