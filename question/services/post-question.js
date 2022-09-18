const Question = require('../models/Question');
const { ServerError } = require('../../util/error-handlers');
const serviceErrorHandler = require('../../util/service-handlers/services-error-handler');

const postQuestion = async ({ title, body, user }) => {
  try {
    if (!title || !body || !user.id) throw new ServerError();
    const question = await Question.create({
      title,
      body,
      ownerId: user.id,
    });

    if (!question) throw new ServerError();

    return ({
      id: question.id,
      title: question.title,
      body: question.body,
      owner: user.name,
      ownerId: question.ownerId,
    });
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = postQuestion;
