// Error Messages
const ERROR_MESSAGE = {
  invalidPassword: 'Password Error. Password should be between 6 - 15 characters and should not contain the word password',
  incorrectPassword: 'Password is not correct',
  invalidEmail: 'Email is invalid or missing',
  incorrectEmail: 'User does not exist',
  duplicateEntry: 'Record already exists',
  invalidName: 'Name is missing or too long',
  serverError: 'Internal Error. Unable to process request at this time',
  invalidToken: 'Token is not valid',
  missingToken: 'Authorization token is missing',
  invalidID: 'User Id is not recognised',
  emptyRequestBody: 'Request is empty',
  invalidQuestionTitle: 'Question title is missing',
  invalidQuestionBody: 'Question body is missing or too long',
  invalidQuestionID: 'Question Id is not recognised or is missing',
  updateError: 'No records updated. User may not be authorised. Please check request and try again later',
  deleteError: 'No records deleted. User may not be authorised. Please check request and try again later',
  invalidAnswerBody: 'Answer body is missing or too long',
  invalidQuerySort: 'Invalid value for query field - sort. Accepted values are TITLE_ASC, TITLE_DESC, ANSWER_ASC or ANSWER_DESC',
  invalidQueryPageNumber: 'Query field, page, is not a number',
  invalidQueryLimit: 'Query field, limit, is not a number',
  incorrectID: 'Encountered an unrecognized ID.',
  invalidAnswerID: 'Answer ID is not recognised or is missing',
  invalidVoteType: 'Invalid query field - type. Accepted values are UP_VOTE or DOWN_VOTE',
  invalidIDParam: 'The parameter field - ID, is not recognised',
  invalidDownVote: 'User already down',
  voteError: 'User is yet to vote',
  invalidCommentBody: 'Comment body is missing or too long.',
};

const SORT_TYPE = {
  title: 'title',
  answer: 'answer',
  votes: 'votes',
};

const SORT_TYPES = [
  `${SORT_TYPE.title}_asc`,
  `${SORT_TYPE.title}_desc`,
  `${SORT_TYPE.answer}_asc`,
  `${SORT_TYPE.answer}_desc`,
  `${SORT_TYPE.votes}_asc`,
  `${SORT_TYPE.votes}_desc`,
];

const VOTE_TYPE = {
  up: 'up_vote',
  down: 'down_vote',
};

module.exports = { ERROR_MESSAGE, SORT_TYPE, SORT_TYPES, VOTE_TYPE };
