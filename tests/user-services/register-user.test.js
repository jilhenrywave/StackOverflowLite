/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const registerUser = require('../../domains/user/user-services/register-user');
const { validEntry } = require('../test-cases/user-profile-test-cases');
const User = require('../../domains/user/models/User');
const Token = require('../../domains/user/models/Token');

describe('Register User', () => {
  before('Setup Stubs', () => {
    const userDBStub = sandbox.stub(User, 'create');
    const tokenDBStub = sandbox.stub(Token, 'create');

    userDBStub.returns({ ...validEntry, id: 'some-id' });
    tokenDBStub.returns({ token: 'some-token' });
  });

  after('Clear Database', () => {
    sandbox.restore();
  });

  context('Good Entry', () => {
    it('should return user object when entry is valid', async () => {
      const user = await registerUser(validEntry);

      expect(user).to.have.keys(['user', 'token']);
      expect(user.user).to.have.keys(['id', 'name', 'email']);
      expect(user.user).not.to.have.keys(['password', 'createdAt', 'modifiedAt']);
      expect(user.user.name).to.eql(validEntry.name);
      expect(user.user.email).to.eql(validEntry.email);
    });
  });
});
