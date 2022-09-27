const { questionId, answer } = require('../test-constants');
const { owner, user } = require('../entities/user.entity');

const missingBody = { paramId: questionId, user: owner };
const missingParamId = { answerBody: answer, user: owner };
const invalidParamId = { answerBody: answer, paramId: 'some-id', user: owner };
const invalidUser = { answerBody: answer, paramId: questionId, user };

const validEntry = { answerBody: answer, paramId: questionId, user: owner };

const getAnswerMissingParams = { start: 2, limit: 3 };
const getAnswerByQuestionId = { questionId, start: 4, limit: 6, sort: ['VOTES', 'ASC'] };
const getAnswerByOwnerId = { ownerId: owner.id };

module.exports = {
  missingBody,
  missingParamId,
  invalidParamId,
  invalidUser,
  validEntry,
  getAnswerByOwnerId,
  getAnswerMissingParams,
  getAnswerByQuestionId,
};
