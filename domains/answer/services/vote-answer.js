/* eslint-disable max-len */
const { Answer, Vote } = require('../../../db/model-handler');
const { VOTE_TYPE, ERROR_MESSAGE } = require('../../../util/constants');
const { RequestError, ServerError } = require('../../../util/error-handlers');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const sequelize = require('../../../db/sequelize');
const serviceErrorHandler = require('../../../util/service-handlers/services-error-handler');
/**
 * Publishes vote by an increase vote count in answer table
 * @param {string} id
 * @param {object} transaction
 * @param {int} votes
 */
const vote = async (id, transaction, votes) => {
  const query = new QueryBuilder()
    .setModel(Answer)
    .setWhere({ id })
    .setTransaction(transaction)
    .build();

  const affectedRows = await query.execIncrement({ votes });

  if (affectedRows[1] < 1) throw new ServerError();
};

/**
 * Registers vote entry in votes table to prevent duplication
 * @param {string} id
 * @param {string} userId
 * @param {object} transaction
 * @param {strng} type
 */
const registerVoteEntry = async (id, userId, transaction, type) => {
  const query = new QueryBuilder()
    .setModel(Vote)
    .setWhere({ answerId: id, userId })
    .setTransaction(transaction)
    .build();

  const foundVote = await query.execFindOne();

  if (foundVote && foundVote.type === type) throw new RequestError(403, ERROR_MESSAGE.duplicateEntry);
  else if (foundVote) await query.execUpdate(Vote, { type });
  else await Vote.create({ answerId: id, userId, type });
};

/**
 * Saves user vote and updates answer
 * @param {object} voteEntry : {id, userId, type}
 * @returns empty object or error
 */
const voteAnswer = async ({ id = '', userId = '', type = VOTE_TYPE.up }) => {
  const transaction = await sequelize.transaction();
  try {
    await registerVoteEntry(id, userId, transaction, type);

    if (type === VOTE_TYPE.up) {
      await vote(id, transaction, 1);
    } else if (type === VOTE_TYPE.down) {
      await vote(id, transaction, -1);
    } else {
      throw new ServerError();
    }

    await transaction.commit();

    return {};
  } catch (e) {
    await transaction.rollback();

    return serviceErrorHandler(e);
  }
};

module.exports = voteAnswer;
