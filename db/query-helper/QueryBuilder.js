const { QueryError } = require('../../util/error-handlers');
const sequelize = require('../sequelize');
const Query = require('./Query');

class QueryBuilder {
  constructor() {
    this.order = [];
    this.raw = true;
  }

  /** @param {object} value: sequelize model */
  setModel(value) { this.model = value; return this; }

  /** @param {object} value */
  setWhere(value) { this.where = value; return this; }

  /** @param {array} value */
  setAttributes(value) { this.attributes = value; return this; }

  /** @param {array} value */
  setInclude(value) { this.include = value; return this; }

  /** @param {boolean} value */
  setRaw(value) { this.raw = value; return this; }

  /** @param {boolean} value */
  setNest(value) { this.nest = value; return this; }

  /** @param {boolean} value */
  setSubQuery(value) { this.subQuery = value; return this; }

  /** @param {String} value */
  setGroup(value) { this.group = value; return this; }

  /** @param {array | string} value */
  setOrder(value) { if (value.length > 0) this.order.push(value); return this; }

  /** @param {int} value */
  setOffset(value) { this.offset = value; return this; }

  /** @param {int} value */
  setLimit(value) { this.limit = value; return this; }

  /** @param {object} value */
  setTransaction(value) { this.transaction = value; return this; }

  build() {
    if (!this.model) throw new QueryError('Model is missing');
    return new Query({ ...this });
  }

  static createFn(sqlFunc, col, alias) {
    return [sequelize.fn(sqlFunc, sequelize.col(col)), alias];
  }

  static createFnOnly(sqlFunc, col) {
    return sequelize.fn(sqlFunc, sequelize.col(col));
  }

  static createIncludeObject(
    model,
    attributes,
    alias = '',
    required = false,
  ) {
    return {
      model,
      as: alias,
      required,
      attributes,
    };
  }
}

module.exports = QueryBuilder;
