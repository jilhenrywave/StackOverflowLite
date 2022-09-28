/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { User } = require('../../../db/model-handler');
const { id } = require('../../test-cases/test-constants');
const { deleteUserOptions } = require('../../test-cases/entities/user.entity');
const deleteUser = require('../../../domains/user/user-services/delete-user');

describe('Delete User Service', () => {
  before('Setting Stubs', () => {
    const deleteStub = sandbox.stub(User, 'destroy');

    deleteStub.withArgs(deleteUserOptions).returns(1);
    deleteStub.returns(0);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if user id is not valid', async () => {
    const response = await deleteUser({ id: 'some-id' });

    expect(response.code).to.eql(422);
  });

  it('should return nothing if user id is valid', async () => {
    const response = await deleteUser({ id });

    expect(response).to.eql({});
  });
});
