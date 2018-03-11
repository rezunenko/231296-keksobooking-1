const INTERNAL_SERVER_ERROR = 500;

module.exports = class InternalServerError extends Error {
  constructor() {
    super();
    this.statusCode = INTERNAL_SERVER_ERROR;
    this.message = `Internal Error`;
    this.errorMessage = `Server has fallen into unrecoverable problem.`;
  }

  showError() {
    return [{error: this.message, errorMessage: this.errorMessage}];
  }
};
