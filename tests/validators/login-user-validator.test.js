/* eslint-disable no-undef */
const { expect } = require('chai');
const loginValidator = require('../../domains/user/validators/login-user.validator');
const { invalidPasswordEntries, invalidEmailEntries, validEntry } = require('../test-cases/login-user-test-cases');
const { ERROR_MESSAGE } = require('../../util/constants');

describe('Login User Validator', () => {
  context('Bad Entries', () => {
    invalidEmailEntries.forEach((entry) => {
      it('should return error when email is not valid', () => {
        const response = loginValidator(entry);

        expect(response).to.have.keys(['code', 'errorMessage', 'type', 'errorMessages']);
        expect(response.code).to.be.a('number');
        expect(response.errorMessages[0]).to.eql(ERROR_MESSAGE.invalidEmail);
        expect(response.errorMessages).to.have.lengthOf(1);
      });
    });

    invalidPasswordEntries.forEach((entry) => {
      it('should return error when password is not valid', () => {
        const response = loginValidator(entry);

        expect(response).to.have.keys(['code', 'errorMessage', 'type', 'errorMessages']);
        expect(response.code).to.be.a('number');
        expect(response.errorMessages[0]).to.eql(ERROR_MESSAGE.invalidPassword);
        expect(response.errorMessages).to.have.lengthOf(1);
      });
    });
  });

  context('Good entries', () => {
    it('should return blank error object', () => {
      const response = loginValidator(validEntry);
      const value = { ...response };

      expect(value.errorMessages).to.have.lengthOf(0);
    });
  });
});
