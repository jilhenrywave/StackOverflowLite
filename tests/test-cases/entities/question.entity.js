/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
const sequelize = require('sequelize');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { Question } = require('../../../db/model-handler');
const { includeUser, includeAnswer } = require('../../../db/query-helper/include-query-constants');
const { SORT_TYPE } = require('../../../util/constants');
const { questionId, title, body, ownerId, answerId, name, id } = require('../test-constants');

const questionModel = {
  id: questionId,
  title,
  body,
  ownerId,
  answerId,
};

const questionResponse = {
  id: questionId,
  title,
  body,
  owner: {
    id: ownerId,
    name,
  },
};

const questions = [
  questionResponse,
  questionResponse,
  questionResponse,
  questionResponse,
  questionResponse,
  questionResponse,
];
const deleteArgs = (where) => new QueryBuilder().setModel(Question).setWhere(where).build().options;
const deleteAllArgs = deleteArgs({ ownerId });
const deleteOneArgs = deleteArgs({ id: questionId, ownerId });

const getQuestionOptions = new QueryBuilder()
  .setModel(Question)
  .setAttributes({ exclude: ['ownerId', 'answerId'] })
  .setInclude([includeUser, includeAnswer])
  .setNest(true)
  .build().options;

const getArgs = (where, page = 1, limit = 50, sort = []) =>
  new QueryBuilder()
    .setModel(Question)
    .setWhere(where)
    .setAttributes({ exclude: ['ownerId', 'answerId'] })
    .setInclude([includeUser, includeAnswer])
    .setNest(true)
    .setSubQuery(false)
    .setGroup(['Question.id'])
    .setOrder(sort)
    .setOffset((page - 1) * limit)
    .setLimit(limit)
    .build().options;

const getQuestionsWithSearch = getArgs({ title: { [sequelize.Op.like]: `%${'search'}%` } });
const getQuestionsWithOwnerId = getArgs({ ownerId });
const getQuestionsSortAnswers = getArgs({}, 1, 50, [
  QueryBuilder.createFnOnly('count', 'answers.question_id'),
  'ASC',
]);
const getQuestionsSortOther = getArgs({}, 1, 50, [SORT_TYPE.title, 'DESC']);

const postOptions = new QueryBuilder().setModel(Question).build().options;
const postQuestionValidArgs = { title, body, ownerId };
const postQuestionInvalidOwnerArgs = { title, body, ownerId: id };

const updateOptions = new QueryBuilder()
  .setModel(Question)
  .setWhere({ id: questionId, ownerId })
  .build().options;
const updateArgs = { title, body };

module.exports = {
  questionModel,
  questionResponse,
  questions,
  deleteAllArgs,
  deleteOneArgs,
  getQuestionOptions,
  getQuestionsWithSearch,
  getQuestionsWithOwnerId,
  getQuestionsSortAnswers,
  getQuestionsSortOther,
  postOptions,
  postQuestionValidArgs,
  postQuestionInvalidOwnerArgs,
  updateOptions,
  updateArgs,
};
