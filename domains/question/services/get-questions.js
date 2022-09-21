const sequelize = require('sequelize');
const User = require('../../user/models/User');
const Answer = require('../../answer/models/Answer');
const { RequestError } = require('../../../util/error-handlers');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const Question = require('../models/Question');
const pageInfoHelper = require('../../../util/page-info-helper');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { SORT_TYPE } = require('../../../util/constants');

const configWhere = (ownerId, search) => {
  if (ownerId) return { ownerId };
  return { title: { [sequelize.Op.like]: `%${search}%` } };
};

/**
 * Retrieves questions from database in pages
 * @param {object} query : Parameters include ownerId, start, limit and sort
 * @returns {object} paginated result
 */
const getPaginatedQuestions = async ({ ownerId = '', start = 0, limit = 50, sort = 'asc', search = '' }) => {
  try {
    const where = configWhere(ownerId, search);

    const include = [QueryBuilder.createIncludeObject(User, ['id', 'name'], 'owner', true)];

    if (sort[0] === SORT_TYPE.answer) {
      const fn = QueryBuilder.createFn('COUNT', 'question_id', 'ans_count');
      include.push(QueryBuilder.createIncludeObject(Answer, [fn]));
    }

    const query = new QueryBuilder()
      .setWhere(where)
      .setAttributes(['id', 'title', 'body'])
      .setInclude(include)
      .setRaw(true)
      .setNest(true)
      .setSubQuery(false)
      .setGroup('Question.id')
      .setOrder(['title', sort])
      .setOffset(start)
      .setLimit(limit)
      .build();

    const { count, rows } = await query.execFindAndCountAll(Question);

    if (!rows) throw new RequestError(404, 'No questions found');

    const pageInfo = pageInfoHelper.createPageInfo(count.length, start, limit);

    return { ...pageInfo, questions: rows };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getPaginatedQuestions;
