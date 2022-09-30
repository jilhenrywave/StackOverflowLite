const sequelize = require('sequelize');
const { Question } = require('../../../db/model-handler');
const { RequestError } = require('../../../util/error-handlers');
const { SORT_TYPE } = require('../../../util/constants');
const { includeUser, includeAnswer } = require('../../../db/query-helper/include-query-constants');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const pageInfoHelper = require('../../../util/page-info-helper');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

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
 * Creates sort query parameter depending on the sort parameter
 * @param {array} sort
 * @returns {object} : include and sort query parameters
 */
const configSort = (sort) => {
  const sortBy = sort;

  if (sort[0] === SORT_TYPE.answer.toUpperCase()) {
    sortBy[0] = QueryBuilder.createFnOnly('count', 'answers.question_id');
  }

  return sortBy;
};

/**
 * Retrieves questions from database in pages
 * @param {object} query : Parameters include ownerId, page, limit and sort
 * @returns {object} paginated result
 */
const getPaginatedQuestions = async ({
  ownerId = '',
  page = 1,
  limit = 50,
  sort = [],
  search = '',
  link = '',
}) => {
  try {
    const where = configWhere(ownerId, search);
    const sortBy = configSort(sort);
    const offset = (page - 1) * limit;

    const query = new QueryBuilder()
      .setModel(Question)
      .setWhere(where)
      .setAttributes({ exclude: ['ownerId', 'answerId'] })
      .setInclude([includeUser, includeAnswer])
      .setNest(true)
      .setSubQuery(false)
      .setGroup(['question.id'])
      .setOrder(sortBy)
      .setOffset(offset)
      .setLimit(limit)
      .build();

    const { count, rows } = await query.execFindAndCountAll();

    if (count && count.length < 1) throw new RequestError(404, 'No questions found');

    const pageInfo = pageInfoHelper.createPageInfo(count.length, page, limit, link);

    return { count: rows.length, ...pageInfo, questions: rows };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getPaginatedQuestions;
