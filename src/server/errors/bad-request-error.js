const BAD_REQUEST = 400;

module.exports = class BadRequestError extends Error {
  constructor(reason) {
    super();
    this.statusCode = BAD_REQUEST;
    this.message = `Bad request`;
    this.errorMessage = reason;
  }

  showError() {
    return [{error: this.message, errorMessage: this.errorMessage}];
  }
};
