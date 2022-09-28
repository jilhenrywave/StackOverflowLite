/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { User } = require('../../../db/model-handler');
const getUser = require('../../../domains/user/user-services/get-user');
const { user, getUserOptions } = require('../../test-cases/entities/user.entity');
const { id, token, ownerId } = require('../../test-cases/test-constants');

describe('Get User Service', () => {
  before('Setting Stubs', () => {
    const findByPkStub = sandbox.stub(User, 'findByPk');

    findByPkStub.withArgs(user.id, getUserOptions).returns(user);
    findByPkStub.returns(null);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should throw error if id is not UUID', async () => {
    const response = await getUser('some-id');

    expect(response.code).to.eql(400);
  });

  it('should throw error if id is not recognized', async () => {
    const response = await getUser(ownerId);

    expect(response.code).to.eql(404);
  });

  it('should return user object if id is valid', async () => {
    const response = await getUser(id, token);

    expect(response).to.eql(user);
  });
});
