/* eslint-disable max-len */
const { ERROR_MESSAGE, VOTE_TYPE } = require('../../../util/constants');
const { ValidationError } = require('../../../util/error-handlers');
const { isValidID, isValidValue } = require('../../../util/field-validators');

const voteAnswerValidator = ({ id = '', voteType = '' }) => {
  const validatorError = new ValidationError();

  if (!isValidID(id)) validatorError.addErrorMessage(ERROR_MESSAGE.invalidAnswerID);

  if (!isValidValue(voteType, Object.values(VOTE_TYPE))) validatorError.addErrorMessage(ERROR_MESSAGE.invalidVoteType);

  return validatorError;
};

module.exports = voteAnswerValidator;
