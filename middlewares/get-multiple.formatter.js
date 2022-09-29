/* eslint-disable object-curly-newline */
/**
 * Formats request query to usable app object
 * @param {object} query
 * @returns {object} formatted query object
 */

const getMultipleFormatter = ({
  ownerId,
  questionId = '',
  answerId = '',
  page = 1,
  limit = 50,
  sort = '',
  search = '',
  link = '',
}) => {
  const format = {
    ownerId,
    questionId,
    answerId,
    page: Number(page),
    limit: Number(limit),
    search,
    link,
  };
  if (sort) format.sort = sort.toUpperCase().split('_');

  return format;
};

module.exports = getMultipleFormatter;
