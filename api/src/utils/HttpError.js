module.exports = class HttpError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
};
