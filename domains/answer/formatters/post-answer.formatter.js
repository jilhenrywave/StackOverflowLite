const postQuestionFormatter = ({ answer = '', questionId = '' }, user) => {
  const formattedBody = {};
  if (answer) formattedBody.answerBody = answer;
  if (questionId) formattedBody.questId = questionId;
  formattedBody.user = user;

  return formattedBody;
};

module.exports = postQuestionFormatter;
