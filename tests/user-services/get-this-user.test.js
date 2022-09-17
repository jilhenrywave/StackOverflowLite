/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
const { expect } = require('chai');
const getThisUser = require('../../user/user-services/get-this-user');
const { ERROR_MESSAGE } = require('../../util/constants');
const { userWithToken } = require('../entities/user-test-entity');

describe('Get this User', () => {
  context('Valid Arguments', () => {
    it('should return valid object when called with valid arguments', () => {
      const response = getThisUser(userWithToken);

      expect(response).to.have.keys(['user', 'token']);
      expect(response.user.id).to.eql(userWithToken.id);
      expect(response.user.name).to.eql(userWithToken.name);
      expect(response.user.email).to.eql(userWithToken.email);
      expect(response.token).to.eql(userWithToken.token);
    });
  });

  context('Invalid Arguments', () => {
    it('should return error object when called with invalid arguments', () => {
      const response = getThisUser({ userId: 'some-other-id' });

      expect(response.code).to.eql(500);
      expect(response.type).to.eql('ServerError');
      expect(response.message).to.eql(ERROR_MESSAGE.serverError);
    });
  });
});
