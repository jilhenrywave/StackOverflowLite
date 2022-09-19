const { RequestError } = require('../../../util/error-handlers');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const User = require('../../user/models/User');
const Question = require('../models/Question');

/**
 * Retrives a question from the database using id
 * @param {UUID} id : Question id
 * @returns {object}
 */
const getQuestion = async (id) => {
  try {
    const question = await Question.findByPk(id, {
      attributes: ['id', 'title', 'body'],
      include: {
        model: User,
        as: 'owner',
        required: true,
        attributes: ['id', 'name'],
      },
      raw: true,
      nest: true,
    });

    if (!question) throw new RequestError(404, 'No question found');

    return question;
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getQuestion;
