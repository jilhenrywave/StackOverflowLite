/* eslint-disable implicit-arrow-linebreak */
const circuitBreaker = require('../../util/circuit-breaker');

class Query {
  constructor(builderOptions) {
    this.model = builderOptions.model;
    this.options = builderOptions;
    delete this.options.model;
  }

  async execFindOne() {
    return circuitBreaker(async () => this.model.findOne(this.options));
  }

  async execFindByPk(primaryKey) {
    return circuitBreaker(async () => this.model.findByPk(primaryKey, this.options));
  }

  async execFindAndCountAll() {
    return circuitBreaker(async () => this.model.findAndCountAll(this.options));
  }

  async execUpdate(values) {
    return circuitBreaker(async () => this.model.update(values, this.options));
  }

  async execIncrement(value) {
    return circuitBreaker(async () => this.model.increment(value, this.options));
  }

  async execCreate(value) {
    return circuitBreaker(async () => this.model.create(value, this.options));
  }

  async execDestroy() {
    return circuitBreaker(async () => this.model.destroy(this.options));
  }
}

module.exports = Query;
