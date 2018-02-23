const assert = require(`assert`);
const generateCommand = require(`../src/generator`);
const fs = require(`fs`);

let checkAndDeleteFile = (file, cb) => {
  fs.access(file, (accessError) => {
    if (accessError) {

      return assert.fail(accessError.message);
    }

    return fs.unlink(file, (unlinkError) => {
      if (unlinkError) {
        return assert.fail(unlinkError.message);
      }

      return cb();
    });
  });
};

describe(`Generate JSON command`, () => {
  it(`should fail or not existing folder`, () => {
    const tempFileName = `${__dirname}\folder\testfile.json`;

    return generateCommand.execute(tempFileName)
        .then(() => assert.fail(`Path ${tempFileName} should not be available`))
        .catch((err) => assert.ok(err));
  });

  it(`should create new file`, (done) => {
    const tempFileName = `${__dirname}/testfile.json`;
    generateCommand.execute(tempFileName)
        .then(() => checkAndDeleteFile(tempFileName, done))
        .catch((err) => assert.fail(err.message));
  });
});
