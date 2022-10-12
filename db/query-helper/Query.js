/* eslint-disable implicit-arrow-linebreak */
const CircuitBreaker = require('opossum');
const { ServerError } = require('../../util/error-handlers');

// Creates and executes circuit breaker
const execCircuitBreaker = (execFunc) => {
  const breaker = new CircuitBreaker(execFunc, {
    timeout: 7000,
    resetTimeout: 15000,
  });

  breaker.fallback(() => {
    throw new ServerError(503, 'Service is currently unavailable. Try again later');
  });

  return breaker
    .fire()
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

class Query {
  constructor(builderOptions) {
    this.model = builderOptions.model;
    this.options = builderOptions;
    delete this.options.model;
  }

  async execFindOne() {
    return execCircuitBreaker(async () => this.model.findOne(this.options));
  }

  async execFindByPk(primaryKey) {
    return execCircuitBreaker(async () => this.model.findByPk(primaryKey, this.options));
  }

  async execFindAndCountAll() {
    return execCircuitBreaker(async () => this.model.findAndCountAll(this.options));
  }

  async execUpdate(values) {
    return execCircuitBreaker(async () => this.model.update(values, this.options));
  }

  async execIncrement(value) {
    return execCircuitBreaker(async () => this.model.increment(value, this.options));
  }

  async execCreate(value) {
    return execCircuitBreaker(async () => this.model.create(value, this.options));
  }

  async execDestroy() {
    return execCircuitBreaker(async () => this.model.destroy(this.options));
  }
}

module.exports = Query;
