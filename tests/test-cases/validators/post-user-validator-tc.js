const { name, email, password } = require('../test-constants');

const invalidPassword1 = 'password';
const invalidPassword2 = '123g';
const invalidEmailField = 'henryjil.com';

const missingAllArgs = {};
const missingName = { email, password };
const missingEmail = { name, password };
const missingPassword = { name, email };
const invalidName = { name: '  ', email, password };
const invalidEmail = { name, email: invalidEmailField, password };
const invalidPassword = { name, email, password: invalidPassword1 };
const invalidPasswordII = { name, email, password: invalidPassword2 };

const validArguments = { name, email, password };
const validArgsName = { name };
const validArgsEmail = { email };
const validArgsPassword = { password };

exports.registerInvalidArguments = {
  missingName,
  missingEmail,
  missingPassword,
  invalidName,
  invalidEmail,
  invalidPassword,
  invalidPasswordII,
};

exports.updateInvalidArguments = {
  missingAllArgs,
  invalidName,
  invalidEmail,
  invalidPassword,
  invalidPasswordII,
};

exports.updateValidArguments = {
  validArgsName,
  validArgsEmail,
  validArgsPassword,
  validArguments,
};

exports.registerValidArguments = validArguments;
