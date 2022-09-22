const postAnswerFormatter = ({ answer = '', paramId = '' }, user) => {
  const formattedBody = {};
  if (answer) formattedBody.answerBody = answer;
  if (paramId) formattedBody.paramId = paramId;
  formattedBody.user = user;

  return formattedBody;
};

module.exports = postAnswerFormatter;
