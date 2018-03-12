require(`dotenv`).config();

module.exports = function () {
  console.log(`Server address ${process.env.SERVER_HOST}`);
  console.log(`Port ${process.env.SERVER_PORT}`);
  console.log(`Log level ${process.env.SERVER_LOG_LEVEL}`);

  console.log(`Db host address ${process.env.DB_HOST}`);
  console.log(`Db posr ${process.env.DB_PORT}`);
  console.log(`Db username ${process.env.DB_USER}`);
  console.log(`Db password ${process.env.DB_PASSWORD}`);
};
