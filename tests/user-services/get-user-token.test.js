/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const getUserToken = require('../../user/user-services/get-user-token');
const User = require('../../user/models/User');
const { AuthenticationError } = require('../../util/error-handlers');
const { ERROR_MESSAGE } = require('../../util/constants');
const { user, token } = require('../entities/user-test-entity');

describe('Get User with Token', () => {
  const invalidUserId = 'some-invalid-id';
  const invalidToken = 'some-invalid-token';

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
      const userWithToken = await getUserToken(user.id, token);

      expect(userWithToken).to.have.keys(['id', 'name', 'email', 'token']);
      expect(userWithToken.id).to.eql(user.id);
      expect(userWithToken.token).to.eql(token);
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
