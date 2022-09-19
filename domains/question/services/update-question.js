const { ERROR_MESSAGE } = require('../../../util/constants');
const { RequestError } = require('../../../util/error-handlers');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const Question = require('../models/Question');
const getQuestion = require('./get-question');

/**
 * Updates a question if it belongs to user
 * @param {object} updateEntry
 * @returns {object}
 */
const updateQuestion = async ({ id, title, body, user }) => {
  try {
    const response = await Question.update({ title, body }, {
      where: {
        id,
        ownerId: user.id,
      },
    });

    if (response[0] < 1) throw new RequestError(422, ERROR_MESSAGE.updateError);

    return await getQuestion(id);
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = updateQuestion;
