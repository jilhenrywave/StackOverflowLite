/* eslint-disable no-undef */
const { expect } = require('chai');
const updateQuestionValidator = require('../../domains/question/validators/update-question.validator');
const { invalidEntries, validEntry } = require('../test-cases/update-question-test-cases');

describe('Update Question Validator', () => {
  context('Invalid Entries', () => {
    Object.entries(invalidEntries).forEach(([key, entry]) => {
      it(`should return error if there is ${key}`, () => {
        const response = updateQuestionValidator(entry);

        expect(response).to.have.keys(['code', 'type', 'errorMessages', 'errorMessage']);
        expect(response.code).to.eql(400);
        expect(response.errorMessages).to.have.lengthOf(1);
      });
    });
  });

  context('Valid Entries', () => {
    it('should not return error if argument is valid', () => {
      const response = updateQuestionValidator(validEntry);

      expect(response.errorMessages).to.have.lengthOf(0);
    });
  });
});
