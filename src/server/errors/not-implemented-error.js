const {NOT_IMPLEMENTED} = require(`./http-status`);

module.exports = class NotImplementedError extends Error {
  constructor(reason) {
    super();
    this.statusCode = NOT_IMPLEMENTED;
    this.message = `Not Implemented`;
    this.errorMessage = reason;
  }

  showError() {
    return [{error: this.message, errorMessage: this.errorMessage}];
  }
};
