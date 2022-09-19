/**
 * Formats request query to usable app object
 * @param {object} query
 * @returns {object} formatted query object
 */

const getQuestionsFormatter = ({ ownerId = '', start = 0, limit = 50, sort = 'asc' }) => ({
  ownerId,
  start: Number(start),
  limit: Number(limit),
  sort: sort.toUpperCase(),
});

module.exports = getQuestionsFormatter;
