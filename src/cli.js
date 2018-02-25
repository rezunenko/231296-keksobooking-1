const readline = require(`readline`);
const fs = require(`fs`);
const generator = require(`./generator`);
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
    userAnswer.path = path ? `${path.replace(`\\`, `//`)}` : `keksobooking.json`;
    resolve(userAnswer);
  });
});

const getFileName = (userAnswer) => new Promise((resolve, reject) => {
  const filePath = `${process.cwd()}${userAnswer.path}`;
  fs.open(filePath, `wx`, (err) => {
    if (err) {
      if (err.code === `EEXIST`) {
        rl.question(`Файл существует, перезаписать? (y/n)`, (answer) => answer === `y` ? resolve(userAnswer) : reject(`Отмена перезаписи`));

        return;
      }

      throw err;
    }

    resolve(userAnswer);
  });
});

const createFile = (userAnswer) => {

  return generator.execute(userAnswer.path, {quantity: userAnswer.quantity});
};

module.exports = {
  name: `help`,
  description: `Show help`,
  execute() {
    generateData()
        .then(getQuantity)
        .then(getFilePath)
        .then(getFileName)
        .then(createFile)
        .then(() => console.log(`file created`))
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          rl.close();
          process.exit(0);
        });
  }
};
