class Query {
  constructor(builderOptions) {
    this.options = builderOptions;
  }

  async execFindOne(model) { return model.findOne(this.options); }

  async execFindByPk(model, primaryKey) { return model.findByPk(primaryKey, this.options); }

  async execFindAndCountAll(model) { return model.findAndCountAll(this.options); }

  async execUpdate(model, values) { return model.update(values, this.options); }

  async execIncrement(model, value) { return model.increment(value, this.options); }

  async execCreate(model, value) { return model.create(value, this.options); }

  async execDestroy(model) { return model.destroy(this.options); }
}

module.exports = Query;
