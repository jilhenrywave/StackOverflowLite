class Query {
  constructor(builderOptions) {
    this.model = builderOptions.model;
    this.options = builderOptions;
    delete this.options.model;
  }

  async execFindOne() { return this.model.findOne(this.options); }

  async execFindByPk(primaryKey) { return this.model.findByPk(primaryKey, this.options); }

  async execFindAndCountAll() { return this.model.findAndCountAll(this.options); }

  async execUpdate(values) { return this.model.update(values, this.options); }

  async execIncrement(value) { return this.model.increment(value, this.options); }

  async execCreate(value) { return this.model.create(value, this.options); }

  async execDestroy() { return this.model.destroy(this.options); }
}

module.exports = Query;
