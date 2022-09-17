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
};

module.exports = {
  ERROR_MESSAGE,
};
