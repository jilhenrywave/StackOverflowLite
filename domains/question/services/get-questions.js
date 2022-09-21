const sequelize = require('sequelize');
const User = require('../../user/models/User');
const Answer = require('../../answer/models/Answer');
const { RequestError } = require('../../../util/error-handlers');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const Question = require('../models/Question');
const pageInfoHelper = require('../../../util/page-info-helper');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { SORT_TYPE } = require('../../../util/constants');

/**
 * Creates where query parameter
 * @param {string} ownerId
 * @param {string} search
 * @returns {object} where query object
 */
const configWhere = (ownerId, search) => {
  if (ownerId) return { ownerId };
  if (search) return { title: { [sequelize.Op.like]: `%${search}%` } };
  return {};
};

/**
 * Creates include and sort query parameters depending on the sort parameter
 * @param {array} sort
 * @returns {object} : include and sort query parameters
 */
const configIncludeAndSort = (sort) => {
  const include = [QueryBuilder.createIncludeObject(User, ['id', 'name'], 'owner', true)];
  const sortBy = sort;

  if ((sort[0] === SORT_TYPE.answer.toUpperCase())) {
    const answerCount = QueryBuilder.createFn('COUNT', 'answers.question_id', 'ans_count');
    const includeAnswer = QueryBuilder.createIncludeObject(Answer, [answerCount], 'answers');
    include.push(includeAnswer);
    sortBy[0] = QueryBuilder.createFnOnly('count', 'answers.question_id');
  }
  return { include, sortBy };
};

/**
 * Retrieves questions from database in pages
 * @param {object} query : Parameters include ownerId, start, limit and sort
 * @returns {object} paginated result
 */
const getPaginatedQuestions = async ({ ownerId = '', start = 0, limit = 50, sort = [], search = '' }) => {
  try {
    const where = configWhere(ownerId, search);
    const attributes = ['id', 'title', 'body'];
    const includeAndSort = configIncludeAndSort(sort);

    const query = new QueryBuilder()
      .setWhere(where)
      .setAttributes(attributes)
      .setInclude(includeAndSort.include)
      .setRaw(true)
      .setNest(true)
      .setSubQuery(false)
      .setGroup('Question.id')
      .setOrder(includeAndSort.sortBy)
      .setOffset(start)
      .setLimit(limit)
      .build();

    const { count, rows } = await query.execFindAndCountAll(Question);

    if (!rows) throw new RequestError(404, 'No questions found');

    const pageInfo = pageInfoHelper.createPageInfo(count.length, start, limit);

    return { ...pageInfo, questions: rows };
  } catch (e) {
    console.log(e);
    return serviceErrorHandler(e);
  }
};

module.exports = getPaginatedQuestions;
