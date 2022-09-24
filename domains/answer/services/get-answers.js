const { Answer } = require('../../../db/model-handler');
const { RequestError } = require('../../../util/error-handlers');
const { SORT_TYPE } = require('../../../util/constants');
const { includeUser, includeQuestion } = require('../../../db/query-helper/include-query-constants');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const pageInfoHelper = require('../../../util/page-info-helper');

const configSort = (sort) => {
  let sortBy = [];
  if (sort[0] === SORT_TYPE.votes.toUpperCase()) {
    sortBy = sort;
    // sortBy[0] = QueryBuilder.createFnOnly('count', 'votes.answer_id');
  }

  return sortBy;
};

/**
 * Retrieves answers from the database
 * @param {object} query
 * @returns {object}
 */
const getAnswers = async ({ questionId = '', ownerId = '', start = 0, limit = 50, sort = [] }) => {
  try {
    if (!questionId && !ownerId) throw new Error();

    const where = {};
    const sortBy = configSort(sort);

    if (questionId) where.questionId = questionId;
    else where.ownerId = ownerId;

    const query = new QueryBuilder()
      .setModel(Answer)
      .setWhere(where)
      .setAttributes({ exclude: ['ownerId'] })
      .setInclude([includeUser, includeQuestion])
      .setOffset(start)
      .setNest(true)
      .setLimit(limit)
      .setOrder(sortBy)
      .build();

    const { count, rows } = await query.execFindAndCountAll();

    if (!count) throw new RequestError(404, 'No answers found');

    const pageInfo = pageInfoHelper.createPageInfo(count, start, limit);

    return { ...pageInfo, answers: rows };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getAnswers;
