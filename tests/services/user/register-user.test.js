/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { User, Token } = require('../../../db/model-handler');
const registerUser = require('../../../domains/user/user-services/register-user');
const {
  registerUserOptions,
  registerUserValuesValid,
  userWithToken,
  registerUserDuplicateEmail,
  user,
} = require('../../test-cases/entities/user.entity');
const { token } = require('../../test-cases/test-constants');

describe('Register User Service', () => {
  before('Setting Stubs', () => {
    const error = new Error();
    error.name = 'SequelizeUniqueConstraintError';
    const createStub = sandbox.stub(User, 'create');
    const registerTokenStub = sandbox.stub(Token, 'create');

    createStub.withArgs(registerUserValuesValid, registerUserOptions).returns(user);
    createStub.withArgs(registerUserDuplicateEmail, registerUserOptions).throws(error);
    registerTokenStub.returns({ token });
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if email already exists', async () => {
    const response = await registerUser(registerUserDuplicateEmail);

    expect(response.code).to.eql(409);
  });

  it('should return user with token email is not taken', async () => {
    const response = await registerUser(registerUserValuesValid);

    expect(response).to.eql(userWithToken);
  });
});
