/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const bcrypt = require('bcrypt');
const loginUserService = require('../../domains/user/user-services/login-user');
const { ERROR_MESSAGE } = require('../../util/constants');
const User = require('../../domains/user/models/User');
const Token = require('../../domains/user/models/Token');
const { userEntry, hashedPassword, token, user } = require('../entities/user-test-entity');

describe('Login User', () => {
  const invalidEmail = 'henry@gmail.com';

  before('Setup Stubs', () => {
    const userDBStub = sandbox.stub(User, 'findOne');
    const tokenDBStub = sandbox.stub(Token, 'create');
    const bcryptHashStub = sandbox.stub(bcrypt, 'hash');
    const bcryptCompareStub = sandbox.stub(bcrypt, 'compare');

    bcryptHashStub.withArgs(userEntry.password).returns(hashedPassword);
    bcryptCompareStub.withArgs(userEntry.password, hashedPassword).returns(true);
    userDBStub.withArgs({ where: { email: invalidEmail } }).returns(undefined);
    userDBStub.returns({ id: user.id, ...userEntry, password: hashedPassword });
    tokenDBStub.returns({ token });
  });

  after('Restore User model', () => {
    sandbox.restore();
  });

  context('Successful Authentication', () => {
    it('should return required response object when entry is valid', async () => {
      const response = await loginUserService(userEntry);

      expect(response).to.have.keys(['user', 'token']);
      expect(response.user).to.have.keys(['id', 'email', 'name']);
      expect(response.token).not.to.be.empty;
      expect(response.user.email).to.eql(userEntry.email);
    });
  });

  context('Unsuccessful Authentication', () => {
    it('should return authentication error object when email is incorrect', async () => {
      const response = await loginUserService({
        email: invalidEmail,
        password: userEntry.password,
      });

      expect(response).to.have.keys(['errorMessage', 'code', 'type']);
      expect(response.code).to.eql(404);
      expect(response.errorMessage).to.eql(ERROR_MESSAGE.incorrectEmail);
    });

    it('should return authentication error object when password is incorrect', async () => {
      const response = await loginUserService({ email: userEntry.email, password: 'wrongpassword' });

      expect(response).to.have.keys(['errorMessage', 'code', 'type']);
      expect(response.code).to.eql(401);
      expect(response.errorMessage).to.eql(ERROR_MESSAGE.incorrectPassword);
    });
  });
});
