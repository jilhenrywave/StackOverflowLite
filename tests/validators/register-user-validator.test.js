/* eslint-disable no-undef */
const { expect } = require('chai');
const { invalidEntries, validEntry } = require('../test-cases/user-profile-test-cases');
const registerUserValidator = require('../../user/validators/register-user.validator');

describe('Register User Validator', () => {
  context('Bad entries', () => {
    Object.entries(invalidEntries).forEach(([title, entry]) => {
      it(`should return error if ${title} exists`, () => {
        const response = registerUserValidator(entry);
        const value = { ...response };

        expect(value).to.have.keys(['code', 'errorMessage', 'type', 'errorMessages']);
        expect(value.code).to.eql(400);
      });
    });
  });

  context('Good entries', () => {
    it('should return blank error object', () => {
      const response = registerUserValidator(validEntry);
      const value = { ...response };

      expect(value.errorMessages).to.have.lengthOf(0);
    });
  });
});
