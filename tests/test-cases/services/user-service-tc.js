/* eslint-disable object-curly-newline */
const { name, email, token, id, password, ownerId } = require('../test-constants');

const getThisUserNoIdArgs = { name, email, token };
const getThisUserNoEmailArgs = { name, id, token };
const getThisUserNoTokenArgs = { name, email, id };
const getThisUserValidArgs = { id, name, email, token };

const loginUserInvalidEmailArgs = { email: 'some-email', password };
const loginUserInvalidPasswordArgs = { email, password: 'invalid-password' };
const loginUserValidArgs = { email, password };

const logoutUserInvalidIdArgs = { token, id: ownerId, all: true };
const logoutUserInvalidTokenArgs = { token: 'some-token', id };
const logoutUserMissingTokenArgs = { id, all: true };
const logoutUserAllTokenArgs = { token, id, all: true };
const logoutUserOneTokenArgs = { token, id, all: false };

const updateUserInvalidIdArgs = { id: 'some-id', update: { email } };
const updateUserDuplicateEmailArgs = { id, update: { email: 'duplicate-email' } };
const updateUserValidArgs = { id, update: { email } };

module.exports = {
  getThisUserNoIdArgs,
  getThisUserNoEmailArgs,
  getThisUserNoTokenArgs,
  getThisUserValidArgs,
  loginUserInvalidEmailArgs,
  loginUserInvalidPasswordArgs,
  loginUserValidArgs,
  logoutUserInvalidIdArgs,
  logoutUserInvalidTokenArgs,
  logoutUserMissingTokenArgs,
  logoutUserAllTokenArgs,
  logoutUserOneTokenArgs,
  updateUserInvalidIdArgs,
  updateUserDuplicateEmailArgs,
  updateUserValidArgs,
};
