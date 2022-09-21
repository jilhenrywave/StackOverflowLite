const User = require('../../domains/user/models/User');
const { answerModel } = require('../entities/answer-test-entity');

const start = 2;
const limit = 4;
const sort = 'asc';

const someOwnerId = 'some-id';
const whereOwner = { ownerId: answerModel.ownerId };
const whereQuestion = { questionId: answerModel.questionId };

const serviceArgs = (where, startAt = 6) => ({
  where,
  attributes: ['id', 'body', 'votes', 'questionId'],
  include: {
    model: User,
    as: 'owner',
    attributes: ['id', 'name'],
  },
  offset: startAt,
  limit,
  order: [['votes', sort]],
});
exports.validQuestionParams = {
  questionId: answerModel.questionId,
  ownerId: answerModel.ownerId,
  start,
  limit,
};
exports.validOwnerParams = { ownerId: answerModel.ownerId, start, limit };
exports.validNoNextParams = { ownerId: answerModel.ownerId, start: 6, limit };
exports.someOwnerId = someOwnerId;
exports.serviceArgsOwner = serviceArgs(whereOwner, start);
exports.serviceArgsQuestion = serviceArgs(whereQuestion, start);
exports.serviceArgsNoNext = serviceArgs(whereOwner);
