const { ERROR_MESSAGE } = require('../../../util/constants');
const { RequestError } = require('../../../util/error-handlers');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const Question = require('../models/Question');

const deleteQuestion = async ({ id = '', ownerId = '', all = false }) => {
  try {
    const where = {};

    if (all) where.ownerId = ownerId;
    else {
      where.id = id;
      where.ownerId = ownerId;
    }

    const response = await Question.destroy({ where });

    if (response < 1) throw new RequestError(422, ERROR_MESSAGE.deleteError);

    return {};
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = deleteQuestion;
