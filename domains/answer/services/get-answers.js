const Answer = require('../models/Answer');
const User = require('../../user/models/User');
const Question = require('../../question/models/Question');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const pageInfoHelper = require('../../../util/page-info-helper');
const { RequestError } = require('../../../util/error-handlers');

const getAnswers = async ({ questionId = '', ownerId = '', start = 0, limit = 50, sort = 'asc' }) => {
  try {
    if (!questionId && !ownerId) throw new Error();

    const where = {};

    if (questionId) where.questionId = questionId;
    else where.ownerId = ownerId;

    const { count, rows } = await Answer.findAndCountAll({
      where,
      attributes: ['id', 'body', 'votes', 'questionId'],
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name'],
      },
      {
        model: Question,
        as: 'question',
        attributes: ['answerId'],
      },
      ],
      offset: start,
      limit,
      order: [['votes', sort]],
    });

    if (!rows) throw new RequestError(404, 'No answers found');

    const pageInfo = pageInfoHelper.createPageInfo(count, start, limit);

    return { ...pageInfo, answers: rows };
  } catch (e) {
    console.log(e);
    return serviceErrorHandler(e);
  }
};

module.exports = getAnswers;
