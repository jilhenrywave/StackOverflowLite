/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { User } = require('../../../db/model-handler');
const updateUser = require('../../../domains/user/user-services/update-user');
const {
  user,
  updateUserValid,
  updateUserOptions,
  updateUserDuplicateEmail,
} = require('../../test-cases/entities/user.entity');
const {
  updateUserInvalidIdArgs,
  updateUserValidArgs,
  updateUserDuplicateEmailArgs,
} = require('../../test-cases/services/user-service-tc');

describe('Update User Service', () => {
  before('Setting Stubs', () => {
    const error = new Error();
    error.name = 'SequelizeUniqueConstraintError';
    const updateStub = sandbox.stub(User, 'update');
    const findByPkStub = sandbox.stub(User, 'findByPk');

    updateStub.withArgs(updateUserValid, updateUserOptions).returns([1]);
    updateStub.withArgs(updateUserDuplicateEmail, updateUserOptions).throws(error);
    updateStub.returns([0]);
    findByPkStub.returns(user);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if id is not recognized', async () => {
    const response = await updateUser(updateUserInvalidIdArgs);

    expect(response.code).to.eql(422);
  });

  it('should return error if update email already exists', async () => {
    const response = await updateUser(updateUserDuplicateEmailArgs);

    expect(response.code).to.eql(409);
  });

  it('should return user object if update is valid', async () => {
    const response = await updateUser(updateUserValidArgs);

    expect(response).to.eql(user);
  });
});
