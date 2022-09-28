/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { User } = require('../../../db/model-handler');
const { getUserTokenOptions, userWithToken } = require('../../test-cases/entities/user.entity');
const { ownerId, token, id } = require('../../test-cases/test-constants');
const getUserWithToken = require('../../../domains/user/user-services/get-user-token');

describe('Get User Token Service', () => {
  before('Setting Stubs', () => {
    const findByPkStub = sandbox.stub(User, 'findByPk');

    findByPkStub.withArgs(id, getUserTokenOptions).returns(userWithToken);
    findByPkStub.returns(null);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should throw error if userid is not valid', async () => {
    try {
      await getUserWithToken(ownerId, token);
    } catch (e) {
      expect(e.code).to.eql(400);
    }
  });

  it('should throw error if token is not valid', async () => {
    try {
      await getUserWithToken(id, 'some-token');
    } catch (e) {
      expect(e.code).to.eql(400);
    }
  });

  it('should return user object with token if arguments are valid', async () => {
    const response = await getUserWithToken(id, token);

    expect(response).to.eql(userWithToken);
  });
});
