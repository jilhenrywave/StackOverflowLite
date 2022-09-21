class Query {
  constructor(builderOptions) {
    this.options = builderOptions;
  }

  async execFindOne(model, args) {
    const response = await model.findOne(args, this.options);
    return response;
  }

  async execFindByPk(model, primaryKey) {
    const response = await model.findByPk(primaryKey, this.options);
    return response;
  }

  async execFindAndCountAll(model) {
    const response = await model.findAndCountAll(this.options);
    return response;
  }
}

module.exports = Query;
