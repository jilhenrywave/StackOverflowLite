const { Op } = require('sequelize');
const User = require('../../user/models/User');
const { RequestError } = require('../../../util/error-handlers');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const Question = require('../models/Question');
const pageInfoHelper = require('../../../util/page-info-helper');

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

    const pageInfo = pageInfoHelper.createPageInfo(count, start, limit);

    return { ...pageInfo, questions: rows };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getPaginatedQuestions;
