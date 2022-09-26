const { email, password } = require('../test-constants');

const invalidPassword1 = 'password';
const invalidPassword2 = '123g';
const invalidEmailField = 'henryjil.com';

const missingEmail = { password };
const missingPassword = { email };
const invalidEmail = { email: invalidEmailField, password };
const invalidPassword = { email, password: invalidPassword1 };
const invalidPasswordII = { email, password: invalidPassword2 };

const validArguments = { email, password };

exports.invalidArguments = {
  missingEmail,
  missingPassword,
  invalidEmail,
  invalidPassword,
  invalidPasswordII,
};

exports.validArguments = validArguments;
