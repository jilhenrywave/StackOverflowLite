const { questionId, answer, answerId, ownerId } = require('../test-constants');
const { owner, user } = require('../entities/user.entity');

const missingBody = { paramId: questionId, user: owner };
const missingParamId = { answerBody: answer, user: owner };
const invalidParamId = { answerBody: answer, paramId: 'some-id', user: owner };
const invalidUser = { answerBody: answer, paramId: questionId, user };

const validEntry = { answerBody: answer, paramId: questionId, user: owner };

const getAnswerMissingParams = { page: 2, limit: 3 };
const getAnswerByQuestionId = { questionId, page: 4, limit: 6, sort: ['VOTES', 'ASC'] };
const getAnswerByOwnerId = { ownerId: owner.id };

const acceptAnswerInvalidAnswerId = { id: 'some-fake-id', ownerId: owner.id };
const acceptAnswerInvalidOwner = { id: answerId, ownerId: user.id };
const accceptAnswerValidArgs = { id: answerId, ownerId: owner.id };
const accceptAnswerRejectArgs = { id: answerId, ownerId: owner.id, reject: true };

const deleteAnswerInvalidArgs = { id: 'some-id', ownerId };
const deleteAnswerValidArgs = { id: answerId, ownerId };

const updateAnswerNoId = { answerBody: answer, user: owner };
const updateAnswerNoBody = { paramId: answerId, user: owner };
const updateAnswerInvalidOwner = { paramId: answerId, answerBody: answer, user };
const updateAnswerValidArgs = { paramId: answerId, answerBody: answer, user: owner };

module.exports = {
  missingBody,
  missingParamId,
  invalidParamId,
  invalidUser,
  validEntry,
  getAnswerByOwnerId,
  getAnswerMissingParams,
  getAnswerByQuestionId,
  acceptAnswerInvalidAnswerId,
  acceptAnswerInvalidOwner,
  accceptAnswerValidArgs,
  accceptAnswerRejectArgs,
  deleteAnswerInvalidArgs,
  deleteAnswerValidArgs,
  updateAnswerNoId,
  updateAnswerNoBody,
  updateAnswerInvalidOwner,
  updateAnswerValidArgs,
};
