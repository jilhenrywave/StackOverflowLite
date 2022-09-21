const { ERROR_MESSAGE } = require('../util/constants');
const { ValidationError } = require('../util/error-handlers');
const { isValidID } = require('../util/field-validators');
const { validationHandler } = require('../util/request-handler');

const idParamValidator = (id) => {
  const validatorError = new ValidationError();

  if (!isValidID(id)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQuestionID);

  return validatorError;
};

module.exports = (req, res, next) => {
  validationHandler(req.params.id, res, next, idParamValidator);
};
