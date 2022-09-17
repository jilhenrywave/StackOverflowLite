/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const getUserToken = require('../user/user-services/get-user-token');
const User = require('../user/models/User');
const { AuthenticationError } = require('../util/error-handlers');
const { ERROR_MESSAGE } = require('../util/constants');

describe('Get User with Token', () => {
  const validUserId = 'some-id';
  const validToken = 'some-token';
  const invalidUserId = 'some-invalid-id';
  const invalidToken = 'some-invalid-token';

  const user = { id: validUserId, name: 'some-name', email: 'some-email' };

  before('Set up stubs', () => {
    const userDBStub = sandbox.stub(User, 'findByPk');
    userDBStub.returns(user);
    userDBStub.withArgs(invalidUserId, invalidToken).returns(undefined);
  });

  after('Remove stubs', () => {
    sandbox.restore();
  });

  context('Valid Arguments', () => {
    it('should return valid user with token when arguments are valid', async () => {
      const userWithToken = await getUserToken(validUserId, validToken);

      expect(userWithToken).to.have.keys(['id', 'name', 'email', 'token']);
      expect(userWithToken.id).to.eql(validUserId);
      expect(userWithToken.token).to.eql(validToken);
    });
  });

  context('Invalid Arguments', () => {
    it('should throw error when arguments are not valid', async () => {
      try {
        await getUserToken(invalidUserId, invalidToken);
      } catch (e) {
        expect(e).to.be.instanceOf(AuthenticationError);
        expect(e.code).to.eql(400);
        expect(e.message).to.eql(ERROR_MESSAGE.invalidToken);
      }
    });
  });
});
