const Answer = require('../models/Answer');
const User = require('../../user/models/User');
const Question = require('../../question/models/Question');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const pageInfoHelper = require('../../../util/page-info-helper');
const { RequestError } = require('../../../util/error-handlers');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { SORT_TYPE } = require('../../../util/constants');

const configSort = (sort) => {
  let sortBy = sort;
  if (sort[0] !== SORT_TYPE.votes.toUpperCase()) sortBy = [];

  return sortBy;
};

const getAnswers = async ({ questionId = '', ownerId = '', start = 0, limit = 50, sort = [] }) => {
  try {
    if (!questionId && !ownerId) throw new Error();

    const where = {};
    const sortBy = configSort(sort);

    if (questionId) where.questionId = questionId;
    else where.ownerId = ownerId;

    const includeUser = QueryBuilder.createIncludeObject(User, ['id', 'name'], 'owner');
    const includeQuestion = QueryBuilder.createIncludeObject(Question, ['answerId'], 'question');

    const query = new QueryBuilder()
      .setWhere(where)
      .setAttributes(['id', 'body', 'votes', 'questionId'])
      .setInclude([includeUser, includeQuestion])
      .setOffset(start)
      .setGroup('id')
      .setLimit(limit)
      .setOrder(sortBy)
      .build();

    const { count, rows } = await query.execFindAndCountAll(Answer);

    if (!rows) throw new RequestError(404, 'No answers found');

    const pageInfo = pageInfoHelper.createPageInfo(count.length, start, limit);

    return { ...pageInfo, answers: rows };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getAnswers;
