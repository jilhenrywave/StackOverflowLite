const { SORT_TYPE } = require('../../../util/constants');
const { ownerId, questionId, id, title, body } = require('../test-constants');
const { owner, user } = require('../entities/user.entity');

const deleteInvalidIdArg = { id: 'some-question-id', ownerId };
const deleteInvalidOwnerArg = { id: questionId, ownerId: 'some-other-id' };
const deleteOneValidArg = { id: questionId, ownerId };
const deleteManyValidArg = { id: questionId, ownerId, all: true };

const getQuestionsValidIdArg = { ownerId };
const getQuestionsUserIdArg = { ownerId: id };
const getQuestionsSearchArg = { search: 'search' };
const getQuestionsSortByAnswerArgs = { sort: [SORT_TYPE.answer.toUpperCase(), 'ASC'] };
const getQuestionsSortOtherArgs = { sort: [SORT_TYPE.title, 'DESC'] };

const postQuestionNoTitle = { body, user: owner };
const postQuestionNoBody = { title, user: owner };
const postQuestionNoUserId = { title, body, user: {} };
const postQuestionInvalidUserId = { title, body, user };
const postQuestionValidArguments = { title, body, user: owner };

const updateQuestionInvalidId = { id: 'some-question-id', title, body, user: owner };
const updateQuestionInvalidOwner = { id: questionId, title, body, user };
const updateQuestionValidArgument = { id: questionId, title, body, user: owner };

module.exports = {
  deleteInvalidIdArg,
  deleteInvalidOwnerArg,
  deleteOneValidArg,
  deleteManyValidArg,
  getQuestionsValidIdArg,
  getQuestionsUserIdArg,
  getQuestionsSearchArg,
  getQuestionsSortByAnswerArgs,
  getQuestionsSortOtherArgs,
  postQuestionNoTitle,
  postQuestionNoBody,
  postQuestionNoUserId,
  postQuestionInvalidUserId,
  postQuestionValidArguments,
  updateQuestionInvalidId,
  updateQuestionInvalidOwner,
  updateQuestionValidArgument,
};
