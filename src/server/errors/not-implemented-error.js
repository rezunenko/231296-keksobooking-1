const NOT_IMPLEMENTED = 501;

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
