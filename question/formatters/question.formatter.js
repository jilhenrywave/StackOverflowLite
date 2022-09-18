const { RequestError } = require('../../util/error-handlers');

const questionFormatter = (question, user) => {
  const formattedBody = {};
  const { title = '', body = '' } = question;

  if (!title || !body) return new RequestError(400, 'Some fields are missing');
  if (title) formattedBody.title = title;
  if (body) formattedBody.body = body;

  formattedBody.user = user;

  return formattedBody;
};

module.exports = questionFormatter;
