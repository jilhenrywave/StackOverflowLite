/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const { validArguments, invalidArguments } = require('../test-cases/validators/get-multiple-validator-tc');
const getMultipleValidator = require('../../middlewares/get-multiple.validator');

describe('Get Multiple Validator', () => {
  context('Invalid Arguments', () => {
    Object.entries(invalidArguments).forEach(([key, value]) => {
      it(`should return error if there is ${key}`, () => {
        const response = getMultipleValidator(value);

        expect(response).to.have.keys(['code', 'errorMessage', 'errorMessages', 'type']);
        expect(response.errorMessages).to.have.lengthOf(1);
        expect(response.code).to.eql(400);
        expect(response.type).to.eql('ValidationError');
      });
    });
  });

  context('Valid Arguments', () => {
    Object.entries(validArguments).forEach(([_key, value]) => {
      it('should return zero error messages if present values are valid', () => {
        const response = getMultipleValidator(value);

        expect(response.errorMessages).to.be.empty;
      });
    });
  });
});
