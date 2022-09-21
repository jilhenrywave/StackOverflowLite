const sequelize = require('../sequelize');
const Query = require('./Query');

class QueryBuilder {
  constructor() {
    this.where = {};
    this.attributes = [];
    this.include = [];
    this.raw = false;
    this.nest = false;
    this.subQuery = true;
    this.group = [];
    this.order = [];
    this.offset = 0;
    this.limit = 50;
  }

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
  setGroup(value) { this.group.push(value); return this; }

  /** @param {array | string} value */
  setOrder(value) { this.order.push(value); return this; }

  /** @param {int} value */
  setOffset(value) { this.offset = value; return this; }

  /** @param {int} value */
  setLimit(value) { this.limit = value; return this; }

  build() {
    return new Query({ ...this });
  }

  static createFn(sqlFunc, col, alias) {
    return [sequelize.fn(sqlFunc, sequelize.col(col)), alias];
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
