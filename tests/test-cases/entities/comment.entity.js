/* eslint-disable implicit-arrow-linebreak */
const { Comment } = require('../../../db/model-handler');
const { answerId, commentId, ownerId, comment, id } = require('../test-constants');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { includeUser } = require('../../../db/query-helper/include-query-constants');
const { owner } = require('./user.entity');

const commentModel = {
  id: commentId,
  body: comment,
  ownerId,
  answerId,
};

const commentResponse = {
  id: commentId,
  body: comment,
  answerId,
  owner: {
    id: ownerId,
    name: owner.name,
  },
};

const comments = [
  commentResponse,
  commentResponse,
  commentResponse,
  commentResponse,
  commentResponse,
];

const deleteArgs = new QueryBuilder()
  .setModel(Comment)
  .setWhere({ id: commentId, ownerId })
  .build().options;

const getArgs = (ansId, start, limit) =>
  new QueryBuilder()
    .setModel(Comment)
    .setAttributes({ exclude: ['ownerId'] })
    .setWhere({ answerId: ansId })
    .setInclude([includeUser])
    .setNest(true)
    .setOffset(start)
    .setLimit(limit)
    .build().options;

const getCommentNoStartLimitArgs = getArgs(answerId, 0, 20);
const getCommentStartLimitArgs = getArgs(answerId, 2, 3);
const getCommentEmpty = getArgs('empty-id', 2, 3);

const createArgs = (ansId, userId) => ({
  body: comment,
  ownerId: userId,
  answerId: ansId,
});

const createOptionsArgs = new QueryBuilder().setModel(Comment).build().options;
const createInvalidUserArgs = createArgs(answerId, id);
const createInvalidAnswerArgs = createArgs('some-answer-id', ownerId);
const createValidArgs = createArgs(answerId, ownerId);

const updateArgs = (ansId, userId) =>
  new QueryBuilder().setModel(Comment).setWhere({ id: ansId, ownerId: userId }).build().options;

const updateInvalidAnswerIdArgs = updateArgs('some-answer-id', ownerId);
const updateInvaliduserIdArgs = updateArgs(answerId, id);
const updateValidArgs = updateArgs(answerId, ownerId);

module.exports = {
  commentModel,
  comments,
  commentResponse,
  deleteArgs,
  getCommentNoStartLimitArgs,
  getCommentStartLimitArgs,
  getCommentEmpty,
  createOptionsArgs,
  createInvalidUserArgs,
  createInvalidAnswerArgs,
  createValidArgs,
  updateInvalidAnswerIdArgs,
  updateInvaliduserIdArgs,
  updateValidArgs,
};
