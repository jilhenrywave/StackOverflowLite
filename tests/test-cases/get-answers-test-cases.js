const QueryBuilder = require('../../db/query-helper/QueryBuilder');
const Question = require('../../domains/question/models/Question');
const User = require('../../domains/user/models/User');
const { answerModel } = require('../entities/answer-test-entity');

const start = 2;
const limit = 4;
const sort = 'asc';

const someOwnerId = 'some-id';
const whereOwner = { ownerId: answerModel.ownerId };
const whereQuestion = { questionId: answerModel.questionId };

const serviceArgs = (where, startAt = 6) => new QueryBuilder()
  .setWhere(where)
  .setAttributes(['id', 'body', 'votes', 'questionId'])
  .setInclude([{
    model: User,
    as: 'owner',
    required: false,
    attributes: ['id', 'name'],
  },
  {
    model: Question,
    as: 'question',
    required: false,
    attributes: ['answerId'],
  },
  ])
  .setOffset(startAt)
  .setLimit(limit)
  .setGroup('id')
  .setOrder([])
  .build()
  .options;

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
