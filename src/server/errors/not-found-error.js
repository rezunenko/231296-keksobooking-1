const NOT_FOUND_CODE = 404;

module.exports = class NotFoundError extends Error {
  constructor(reason) {
    super();
    this.statusCode = NOT_FOUND_CODE;
    this.message = `Not Found`;
    this.errorMessage = reason;
  }

  showError() {
    return [{error: this.message, errorMessage: this.errorMessage}];
  }
};
