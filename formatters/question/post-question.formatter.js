/**
 * Formats request object to usable app object
 * @param {object} question : Data Entry object
 * @param {object} user : Associated User
 * @returns {object} formatted request object
 */
const postQuestionFormatter = (question, user) => {
  const formattedBody = {};
  const { id = '', title = '', body = '' } = question;

  if (id) formattedBody.id = id;
  if (title) formattedBody.title = title;
  if (body) formattedBody.body = body;

  formattedBody.user = user;

  return formattedBody;
};

module.exports = postQuestionFormatter;
