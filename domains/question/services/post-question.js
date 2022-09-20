const Question = require('../models/Question');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * Stores question in database
 * @param {object} questionEntry : With properties title, body and user
 * @returns {object} stored question object with owner data
 */
const postQuestion = async ({ title = '', body = '', user }) => {
  try {
    if (!title || !body || !user.id) throw new Error();
    const question = await Question.create({
      title,
      body,
      ownerId: user.id,
    });

    if (!question) throw new Error();

    return ({
      id: question.id,
      title: question.title,
      body: question.body,
      owner: {
        id: question.ownerId,
        name: user.name,
      },
    });
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = postQuestion;
