const { Op } = require('sequelize');
const User = require('../../user/models/User');
const { RequestError } = require('../../../util/error-handlers');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const Question = require('../models/Question');
/**
 * Determines the next start and limit for subsequent query
 * @param {number} recordCount : total number of records matching query
 * @param {number} start : offset of current query
 * @param {number} limit : number of records to be returned of current query
 * @returns {object} pageInfo{ previous , next }
 */
const calculateNextPage = (recordCount, start, limit) => {
  const pageInfo = { previous: { start, limit } };
  const nextRecord = start + limit;

  if (nextRecord >= recordCount) return pageInfo;

  if ((nextRecord + limit) > recordCount) {
    pageInfo.next = { start: nextRecord, limit: recordCount - nextRecord };
  } else {
    pageInfo.next = { start: nextRecord, limit };
  }

  return pageInfo;
};

/**
 * Retrieves questions from database in pages
 * @param {object} query : Parameters include ownerId, start, limit and sort
 * @returns {object} paginated result
 */
const getPaginatedQuestions = async ({ ownerId = '', start = 0, limit = 50, sort = '', search = '' }) => {
  try {
    const where = {};
    if (ownerId) where.ownerId = ownerId;
    if (search) where.title = { [Op.like]: `%${search}%` };

    const { count, rows } = await Question.findAndCountAll({
      where,
      attributes: ['id', 'title', 'body'],
      include: {
        model: User,
        as: 'owner',
        required: true,
        attributes: ['id', 'name'],
      },
      order: [['title', sort]],
      offset: start,
      limit,
    });

    if (!rows) throw new RequestError(404, 'No questions found');

    const pageInfo = calculateNextPage(count, start, limit);

    return { previous: pageInfo.previous, next: pageInfo.next, questions: rows };
  } catch (e) {
    console.log(e);
    return serviceErrorHandler(e);
  }
};

module.exports = getPaginatedQuestions;
