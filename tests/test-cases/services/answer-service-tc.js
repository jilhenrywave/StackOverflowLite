const { questionId, answer, answerId, ownerId, id } = require('../test-constants');
const { owner, user } = require('../entities/user.entity');
const { VOTE_TYPE } = require('../../../util/constants');

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

const voteAnswerDuplicateVotesArgs = {
  id: answerId,
  userId: id,
  type: VOTE_TYPE.down,
  remove: false,
};

const voteAnswerInvalidId = {
  id: 'some-id',
  userId: id,
  type: VOTE_TYPE.down,
  remove: false,
};

const voteAnswerInvalidUser = {
  id: answerId,
  userId: 'some-user-od',
  type: VOTE_TYPE.down,
  remove: false,
};

const voteAnswerValid = {
  id: answerId,
  userId: id,
  type: VOTE_TYPE.up,
  remove: false,
};

const voteAnswerRemoveError = {
  id: answerId,
  userId: 'some-id',
  type: VOTE_TYPE.up,
  remove: true,
};

const voteAnswerRemove = {
  id: answerId,
  userId: id,
  type: VOTE_TYPE.down,
  remove: true,
};

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
  voteAnswerDuplicateVotesArgs,
  voteAnswerInvalidId,
  voteAnswerInvalidUser,
  voteAnswerValid,
  voteAnswerRemoveError,
  voteAnswerRemove,
};
