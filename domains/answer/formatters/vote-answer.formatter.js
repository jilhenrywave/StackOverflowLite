const voteAnswerFormatter = ({ id = '', user, voteType = '' }) => ({
  id,
  userId: user.id,
  type: voteType,
});
module.exports = voteAnswerFormatter;
