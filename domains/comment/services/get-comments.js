const { Comment } = require('../../../db/model-handler');
const { includeUser } = require('../../../db/query-helper/include-query-constants');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const { RequestError } = require('../../../util/error-handlers');
const pageInfoHelper = require('../../../util/page-info-helper');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');

const getComments = async ({ answerId = '', page = 0, limit = 20, link = '' }) => {
  try {
    if (!answerId) throw new Error();

    const offset = (page - 1) * limit;

    const query = new QueryBuilder()
      .setModel(Comment)
      .setAttributes({ exclude: ['ownerId'] })
      .setWhere({ answerId })
      .setInclude([includeUser])
      .setNest(true)
      .setOffset(offset)
      .setLimit(limit)
      .build();

    const { count, rows } = await query.execFindAndCountAll();

    if (!count) throw new RequestError(404, 'No comments found');

    const pageInfo = pageInfoHelper.createPageInfo(count, page, limit, link);

    return { count: rows.length, ...pageInfo, comments: rows };
  } catch (e) {
    return serviceErrorHandler(e);
  }
};

module.exports = getComments;
