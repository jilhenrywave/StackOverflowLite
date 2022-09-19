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
};

module.exports = { ERROR_MESSAGE };
