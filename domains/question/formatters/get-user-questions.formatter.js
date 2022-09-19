const getUserQuestionsFormatter = (user, { limit = 50, start = 0, sort = 'asc' }) => ({
  ownerId: user.id,
  limit: Number(limit),
  start: Number(start),
  sort: sort.toUpperCase(),
});

module.exports = getUserQuestionsFormatter;
