/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const User = require('../../user/models/User');
const getUser = require('../../user/user-services/get-user');
const { ERROR_MESSAGE } = require('../../util/constants');
const { user } = require('../entities/user-test-entity');

describe('Get User', () => {
  before('Setting up stubs', () => {
    const userDBStub = sandbox.stub(User, 'findByPk');
    userDBStub.withArgs(user.id).returns(user);
    userDBStub.returns(undefined);
  });

  after('Removing stubs', () => {
    sandbox.restore();
  });

  context('Valid Arguments', () => {
    it('should return user object when called with valid id', async () => {
      const response = await getUser(user.id);

      expect(response).to.have.keys(['id', 'name', 'email']);
      expect(response.id).to.eql(user.id);
      expect(response.name).to.eql(user.name);
      expect(response.email).to.eql(user.email);
    });
  });

  context('Inalid Arguments', () => {
    it('should return validation error object when id is not UUID', async () => {
      const response = await getUser(user.name);

      expect(response).to.have.keys(['code', 'errorMessage', 'type', 'errorMessages']);
      expect(response.code).to.eql(400);
      expect(response.errorMessage).to.eql(ERROR_MESSAGE.invalidID);
      expect(response.type).to.eql('ValidationError');
    });

    it('should return request error object no user is found', async () => {
      const response = await getUser('f9107d9c-d3f3-4c92-80b7-f0299f56e941');

      expect(response).to.have.keys(['code', 'errorMessage', 'type']);
      expect(response.code).to.eql(404);
      expect(response.type).to.eql('RequestError');
    });
  });
});
