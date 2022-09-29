const { VOTE_TYPE } = require('../../util/constants');
const {
  id,
  name,
  email,
  password,
  hashedPassword,
  answer,
  comment,
  title,
  body,
  ownerId,
  questionId,
  answerId,
  search,
  sortAnswer,
  page,
  limit,
  link,
} = require('./test-constants');

const user = {
  id,
  name,
  email,
};

const question = {
  id: questionId,
  title,
  body,
};

exports.multipleFormatterTC = {
  input: {
    ownerId,
    questionId,
    answerId,
    page,
    limit,
    link,
    search,
    sort: sortAnswer,
  },
  output: {
    ownerId,
    questionId,
    answerId,
    page: Number(page),
    limit: Number(limit),
    link,
    search,
    sort: sortAnswer.toUpperCase().split('_'),
  },
};

exports.user = user;

exports.question = question;

exports.postAnswerFormatterTC = {
  input: {
    answer,
    paramId: questionId,
  },
  output: {
    answerBody: answer,
    paramId: questionId,
    user,
  },
};

exports.voteAnswerFormatterTC = {
  input: {
    id,
    user,
    voteType: VOTE_TYPE.down,
  },
  output: {
    id,
    userId: user.id,
    type: VOTE_TYPE.down,
  },
};

exports.postCommentFormatterTC = {
  input: {
    comment,
    paramId: answerId,
  },
  output: {
    commentBody: comment,
    paramId: answerId,
    user,
  },
};

exports.postQuestionFormatterTC = {
  output: {
    id: question.id,
    title,
    body,
    user,
  },
};

exports.userProfileFormatterTC = {
  input: { name, email, password },
  output: { name, email, password: hashedPassword },
};
