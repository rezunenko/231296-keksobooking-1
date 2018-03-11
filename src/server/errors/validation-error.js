const BAD_REQUEST = 400;

module.exports = class ValidationError extends Error {
  constructor(errors) {
    super();
    this.statusCode = BAD_REQUEST;
    this.errors = errors;
  }

  showError() {
    return this.errors;
  }
};
