const {Duplex} = require(`stream`);

const createStreamFromBuffer = (buffer) => {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

module.exports = createStreamFromBuffer;
