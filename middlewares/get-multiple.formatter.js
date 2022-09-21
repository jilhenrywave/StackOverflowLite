/* eslint-disable object-curly-newline */
/**
 * Formats request query to usable app object
 * @param {object} query
 * @returns {object} formatted query object
 */

const getMultipleFormatter = ({ ownerId, questionId = '', start = 0, limit = 50, sort = 'asc', search = '' }) => ({
  ownerId,
  questionId,
  start: Number(start),
  limit: Number(limit),
  sort: sort.toUpperCase(),
  search,
});

module.exports = getMultipleFormatter;
