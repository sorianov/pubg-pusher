class InvalidFetchType extends Error {
  constructor(msg) {
    super(msg || 'A string or array of strings must be passed');
    this.name = this.constructor.name;
  }
}

module.exports = {
  InvalidFetchType
};
