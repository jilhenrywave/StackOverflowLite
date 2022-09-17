/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
const { expect } = require('chai');
const getThisUser = require('../user/user-services/get-this-user');
const { ERROR_MESSAGE } = require('../util/constants');

describe('Get this User', () => {
  context('Valid Arguments', () => {
    it('should return valid object when called with valid arguments', () => {
      const arg = { id: 'some-id', name: 'some-name', email: 'some-email', token: 'some-token' };
      const response = getThisUser(arg);

      expect(response).to.have.keys(['user', 'token']);
      expect(response.user.id).to.eql(arg.id);
      expect(response.user.name).to.eql(arg.name);
      expect(response.user.email).to.eql(arg.email);
      expect(response.token).to.eql(arg.token);
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
