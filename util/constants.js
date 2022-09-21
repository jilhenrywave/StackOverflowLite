// Error Messages
const ERROR_MESSAGE = {
  invalidPassword: 'Password Error. Password should be 6 or more characters and should not contain the word password',
  incorrectPassword: 'Password is not correct',
  invalidEmail: 'Email is invalid or missing',
  incorrectEmail: 'User does not exist',
  duplicateEmail: 'Email already exists',
  invalidName: 'Name is missing',
  serverError: 'Internal Error. Unable to process request at this time',
  invalidToken: 'Token is not valid',
  missingToken: 'Authorization token is missing',
  invalidID: 'User Id is not recognised',
  emptyRequestBody: 'Request is empty',
  invalidQuestionTitle: 'Question title is missing',
  invalidQuestionBody: 'Question body is missing',
  invalidQuestionID: 'Question Id is not recognised or is missing',
  updateError: 'No records updated. User may not be authorised. Please check request and try again later',
  deleteError: 'No records deleted. User may not be authorised. Please check request and try again later',
  invalidAnswerBody: 'Answer body is missing.',
  invalidQuerySort: 'Invalid value for query field - sort. Accepted values are TITLE_ASC, TITLE_DESC, ANSWERS_ASC or ANSWERS_DESC',
  invalidQueryStart: 'Query field, start, is not a number',
  invalidQueryLimit: 'Query field, limit, is not a number',
  incorrectID: 'Encountered an unrecognized ID.',
};

const SORT_TYPE = {
  title: 'title',
  answer: 'answer',
};

const SORT_TYPES = [
  `${SORT_TYPE.title}_asc`,
  `${SORT_TYPE.title}_desc`,
  `${SORT_TYPE.answer}_asc`,
  `${SORT_TYPE.answer}_desc`,
];

module.exports = { ERROR_MESSAGE, SORT_TYPE, SORT_TYPES };
