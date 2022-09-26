/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const {
  updateInvalidArguments,
  updateValidArguments,
} = require('../test-cases/validators/post-user-validator-tc');
const updateUserValidator = require('../../validators/user/update-user.validator');

describe('Update User Validator', () => {
  context('Invalid Arguments', () => {
    Object.entries(updateInvalidArguments).forEach(([key, value]) => {
      it(`should return error if there is ${key}`, () => {
        const response = updateUserValidator(value);

        expect(response).to.have.keys(['code', 'type', 'errorMessages', 'errorMessage']);
        expect(response.errorMessages).to.have.lengthOf(1);
        expect(response.code).to.eql(400);
        expect(response.type).to.eql('ValidationError');
      });
    });
  });

  context('Valid Arguments', () => {
    Object.entries(updateValidArguments).forEach(([key, value]) => {
      it(`should return zero error messages if ${key}`, () => {
        const response = updateUserValidator(value);

        expect(response.errorMessages).to.be.empty;
      });
    });
  });
});
