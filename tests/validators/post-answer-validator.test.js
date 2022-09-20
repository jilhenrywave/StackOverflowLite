/* eslint-disable no-undef */
const { expect } = require('chai');
const postAnswerValidator = require('../../domains/answer/validators/post-answer.validator');
const { invalidEntries, validEntry } = require('../test-cases/post-answer-test-cases');

describe('Post Answer Validator', () => {
  context('Invalid Entries', () => {
    Object.entries(invalidEntries).forEach(([key, entry]) => {
      it(`should return error if there is ${key}`, () => {
        const response = postAnswerValidator(entry);

        expect(response).to.have.keys(['code', 'type', 'errorMessage', 'errorMessages']);
        expect(response.errorMessages).to.have.lengthOf(1);
      });
    });
  });

  context('Valid Entry', () => {
    it('should return no errors if question id and answer body is present', () => {
      const response = postAnswerValidator(validEntry);

      expect(response.errorMessages).to.have.lengthOf(0);
    });
  });
});
