/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const User = require('../../user/models/User');
const updateUser = require('../../user/user-services/update-user');
const { ERROR_MESSAGE } = require('../../util/constants');
const { user } = require('../entities/user-test-entity');

describe('Update User Service', () => {
  const update = { name: user.name, email: user.email };
  const duplicate = { email: 'some-duplicate-email' };

  before('Setting up stubs', () => {
    const updateStub = sandbox.stub(User, 'update');
    const getUserStub = sandbox.stub(User, 'findByPk');

    updateStub.returns([]);
    updateStub.withArgs(update, { where: { id: user.id } }).returns([1]);
    updateStub
      .withArgs(duplicate, { where: { id: user.id } })
      .throws({ name: 'SequelizeUniqueConstraintError' });

    getUserStub.withArgs(user.id).returns(user);
  });

  context('Valid Entries', () => {
    it('should return response object if user request is valid', async () => {
      const response = await updateUser({ id: user.id, update });

      expect(response).to.have.keys(['id', 'name', 'email']);
      expect(response.id).to.eql(user.id);
      expect(response.name).to.eql(user.name);
      expect(response.email).to.eql(user.email);
    });
  });

  context('Invalid Entries', () => {
    it('should return error if user is not found', async () => {
      const response = await updateUser({ id: 'unknown-id', update });

      expect(response).to.have.keys(['code', 'errorMessage', 'type']);
      expect(response.code).to.eql(500);
    });

    it('should return error if email already exist', async () => {
      const response = await updateUser({ id: user.id, update: duplicate });

      expect(response).to.have.keys(['code', 'errorMessage', 'type']);
      expect(response.code).to.eql(409);
      expect(response.errorMessage).to.eql(ERROR_MESSAGE.duplicateEmail);
    });
  });
});
