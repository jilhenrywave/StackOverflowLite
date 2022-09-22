const { ERROR_MESSAGE } = require('../util/constants');
const { ValidationError } = require('../util/error-handlers');
const { isValidID } = require('../util/field-validators');
const { validationHandler } = require('../util/request-handler');

const validator = (id) => {
  const validatorError = new ValidationError();

  if (!isValidID(id)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidIDParam);

  return validatorError;
};

const idParamValidator = (req, res, next) => {
  validationHandler(req.params.id, res, next, validator);
};

module.exports = idParamValidator;
