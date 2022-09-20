/**
 * Formats request query to usable app object
 * @param {object} user
 * @param {object} query
 * @returns {object} formatted query object
 */

const getAnswersFormatter = (user, { questionId = '', start = 0, limit = 50, sort = 'asc' }) => ({
  ownerId: user.id,
  questionId,
  start: Number(start),
  limit: Number(limit),
  sort: sort.toUpperCase(),
});

module.exports = getAnswersFormatter;
