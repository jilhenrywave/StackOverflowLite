const Vote = require('../models/Vote');
const { VOTE_TYPE, ERROR_MESSAGE } = require('../../../util/constants');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
const { ServerError, RequestError } = require('../../../util/error-handlers');

const voteAnswer = async ({ id = '', userId = '', type = VOTE_TYPE.up }) => {
  try {
    if (type === VOTE_TYPE.up) {
      const vote = await Vote.create({ answerId: id, userId });

      if (!vote) throw new ServerError();
    } else {
      const affectedRecord = await Vote.destroy({ where: { answerId: id, userId } });

      if (affectedRecord < 1) throw new RequestError(406, ERROR_MESSAGE.deleteError);
    }
    return {};
  } catch (e) {
    console.log(e);
    return serviceErrorHandler(e);
  }
};

module.exports = voteAnswer;
