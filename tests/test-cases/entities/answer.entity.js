/* eslint-disable implicit-arrow-linebreak */
const { Answer } = require('../../../db/model-handler');
const {
  includeUser,
  includeQuestion,
} = require('../../../db/query-helper/include-query-constants');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { getAnswerByOwnerId, getAnswerByQuestionId } = require('../services/answer-service-tc');
const { answerId, questionId, answer } = require('../test-constants');
const { owner } = require('./user.entity');

const answerModel = {
  id: answerId,
  body: answer,
  votes: 10,
  questionId,
  ownerId: owner.id,
};

const { id, body, votes, questionId: qId } = answerModel;
const answerResponse = {
  id,
  body,
  votes,
  questionId: qId,
  user: {
    id: owner.id,
    name: owner.name,
  },
};

const answerResponses = [
  answerResponse,
  answerResponse,
  answerResponse,
  answerResponse,
  answerResponse,
  answerResponse,
  answerResponse,
];

const createArgs = {
  body: answer,
  questionId,
  ownerId: owner.id,
};

const findAllArgs = (where, start, limit, sort) =>
  new QueryBuilder()
    .setModel(Answer)
    .setWhere(where)
    .setAttributes({ exclude: ['ownerId'] })
    .setInclude([includeUser, includeQuestion])
    .setOffset(start)
    .setNest(true)
    .setLimit(limit)
    .setOrder(sort)
    .build().options;

const findAllOwnerIdArgs = findAllArgs({ ownerId: getAnswerByOwnerId.ownerId }, 0, 50, []);

const { questionId: questId, start, limit, sort } = getAnswerByQuestionId;
const findAllQuestionIdArgs = findAllArgs({ questionId: questId }, start, limit, sort);

module.exports = {
  answerModel,
  answerResponse,
  answerResponses,
  createArgs,
  findAllOwnerIdArgs,
  findAllQuestionIdArgs,
};
