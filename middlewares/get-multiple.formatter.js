/* eslint-disable object-curly-newline */
/**
 * Formats request query to usable app object
 * @param {object} query
 * @returns {object} formatted query object
 */

const getMultipleFormatter = ({ ownerId, questionId = '', start = 0, limit = 50, sort = '', search = '' }) => {
  const format = {
    ownerId,
    questionId,
    start: Number(start),
    limit: Number(limit),
    search,
  };
  if (sort) format.sort = sort.toUpperCase().split('_');
  return format;
};

module.exports = getMultipleFormatter;
