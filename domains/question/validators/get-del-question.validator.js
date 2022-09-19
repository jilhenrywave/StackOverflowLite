const { ERROR_MESSAGE } = require('../../../util/constants');
const { ValidationError } = require('../../../util/error-handlers');
const { isValidID } = require('../../../util/field-validators');

const getDelQuestionValidator = (id) => {
  const validatorError = new ValidationError();

  if (!isValidID(id)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidQuestionID);

  return validatorError;
};

module.exports = getDelQuestionValidator;
