class BadRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
  }
}

class GetCurrencyFromExternalSource extends Error {
  constructor(message, error) {
    super(message);
    this.name = this.constructor.name;
    this.stack = error.stack;
    this.status = 500;
  }
}

module.exports = {
  BadRequestError,
  GetCurrencyFromExternalSource,
};
