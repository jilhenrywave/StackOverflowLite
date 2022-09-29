/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const bcrypt = require('bcrypt');
const { User, Token } = require('../../../db/model-handler');
const {
  findOneOptions,
  userWithPassword,
  userWithToken,
} = require('../../test-cases/entities/user.entity');
const { password, hashedPassword, token } = require('../../test-cases/test-constants');
const loginUser = require('../../../domains/user/user-services/login-user');
const {
  loginUserInvalidEmailArgs,
  loginUserInvalidPasswordArgs,
  loginUserValidArgs,
} = require('../../test-cases/services/user-service-tc');

describe('Login User Service', () => {
  before('Setting Stubs', () => {
    const findOneStub = sandbox.stub(User, 'findOne');
    const bcryptStub = sandbox.stub(bcrypt, 'compare');
    const registerTokenStub = sandbox.stub(Token, 'create');

    findOneStub.withArgs(findOneOptions).returns({ ...userWithPassword, password: hashedPassword });
    bcryptStub.withArgs(password, hashedPassword).returns(true);
    registerTokenStub.returns({ token });
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if email is not valid', async () => {
    const response = await loginUser(loginUserInvalidEmailArgs);

    expect(response.code).to.eql(404);
  });

  it('should return error if password id not valid', async () => {
    const response = await loginUser(loginUserInvalidPasswordArgs);

    expect(response.code).to.eql(401);
  });

  it('should return user object with token id email and password are valid', async () => {
    const response = await loginUser(loginUserValidArgs);

    expect(response).to.eql(userWithToken);
  });
});
