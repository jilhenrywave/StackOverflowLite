/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const User = require('../../user/models/User');
const { user } = require('../entities/user-test-entity');
const deleteUser = require('../../user/user-services/delete-user');

describe('Delete User', () => {
  before('Setting up stubs', () => {
    const deleteStub = sandbox.stub(User, 'destroy');

    deleteStub.withArgs({ where: { id: user.id } }).returns([1]);
    deleteStub.returns([]);
  });

  after('Removing stubs', () => {
    sandbox.restore();
  });
  context('Valid Entries', () => {
    it('should return response object if id is valid', async () => {
      const response = await deleteUser(user);

      expect(response).to.have.keys(['id', 'name', 'email']);
      expect(response.id).to.eql(user.id);
      expect(response.name).to.eql(user.name);
      expect(response.email).to.eql(user.email);
    });
  });

  context('Invalid Entries', () => {
    it('should return error object if id is not valid', async () => {
      const response = await deleteUser({ ...user, id: 'some-invalid-id' });

      expect(response).to.have.keys(['code', 'errorMessage', 'type']);
      expect(response.code).to.eql(500);
    });
  });
});
