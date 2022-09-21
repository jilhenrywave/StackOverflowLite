/* eslint-disable no-undef */
const { expect } = require('chai');
const getMultipleValidator = require('../../middlewares/get-multiple.validator');
const { invalidEntries, validEntries } = require('../test-cases/get-multiple-test-cases');

describe('Get Multiple Validator', () => {
  context('Invalid Entries', () => {
    Object.entries(invalidEntries).forEach(([key, entry]) => {
      it(`should return error if there is ${key}`, () => {
        const response = getMultipleValidator(entry);

        expect(response).to.have.keys(['code', 'type', 'errorMessages', 'errorMessage']);
        expect(response.code).to.eql(400);
        expect(response.errorMessages).to.have.lengthOf(1);
      });
    });
  });

  context('Valid Entries', () => {
    Object.entries(validEntries).forEach(([key, entry]) => {
      it(`should not return error if  ${key} obey rules`, () => {
        const response = getMultipleValidator(entry);

        expect(response.errorMessages).to.have.lengthOf(0);
      });
    });
  });
});
