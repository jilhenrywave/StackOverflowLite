/**
 * Formats request query to usable app object
 * @param {object} user
 * @param {object} query
 * @returns {object} formatted query object
 */

const getUserQuestionsFormatter = (user, { limit = 50, start = 0, sort = 'asc' }) => ({
  ownerId: user.id,
  limit: Number(limit),
  start: Number(start),
  sort: sort.toUpperCase(),
});

module.exports = getUserQuestionsFormatter;
