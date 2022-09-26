/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const { registerInvalidArguments, registerValidArguments } = require('../test-cases/validators/post-user-validator-tc');
const registerUserValidator = require('../../validators/user/register-user.validator');

describe('Register User Validator', () => {
  context('Invalid Arguments', () => {
    Object.entries(registerInvalidArguments).forEach(([key, value]) => {
      it(`should return error if there is ${key}`, () => {
        const response = registerUserValidator(value);

        expect(response).to.have.keys(['code', 'type', 'errorMessages', 'errorMessage']);
        expect(response.errorMessages).to.have.lengthOf(1);
        expect(response.code).to.eql(400);
        expect(response.type).to.eql('ValidationError');
      });
    });
  });

  context('Valid Argument', () => {
    it('should return zero error messages if arguments are valid', () => {
      const response = registerUserValidator(registerValidArguments);

      expect(response.errorMessages).to.be.empty;
    });
  });
});
