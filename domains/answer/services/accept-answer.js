const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const Answer = require('../models/Answer');
const Question = require('../../question/models/Question');
const { RequestError } = require('../../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../../util/constants');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

/**
 * Retrieves answer record from database
 * @param {string} answerId
 * @returns {object} : {answerId, questionId}
 * @throws
 */
const getAnswer = async (answerId) => {
  const findAnswerQuery = new QueryBuilder()
    .setAttributes(['id', 'questionId'])
    .build();

  const answer = await findAnswerQuery.execFindByPk(Answer, answerId);

  if (!answer) throw new RequestError(400, ERROR_MESSAGE.invalidAnswerID);

  return answer;
};

/**
 * Update question record with accepted answer id
 * @param {string} answerId
 * @param {string} questionId
 * @returns {int} number of records updated
 */
const updateQuestion = async (id, answerId, ownerId) => {
  const updateQuestionQuery = new QueryBuilder()
    .setWhere({ id, ownerId })
    .build();

  const update = await updateQuestionQuery.execUpdate(Question, { answerId });

  if (update[0] < 1) throw new RequestError(422, ERROR_MESSAGE.updateError);

  return update[0];
};

/**
 * Updates question record with accepted answer
 * @param {string} id
 * @returns
 */
const acceptAnswer = async ({ id, ownerId }) => {
  try {
    const answer = await getAnswer(id);

    await updateQuestion(answer.questionId, answer.id, ownerId);

    return {};
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = acceptAnswer;
