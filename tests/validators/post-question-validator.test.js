/* eslint-disable no-undef */
const { expect } = require('chai');
const postQuestionValidator = require('../../domains/question/validators/post-question.validator');
const { questionEntry } = require('../entities/question-test-entity');

describe('Post Question Validator', () => {
  context('Invalid Entries', () => {
    it('should return error if there is no title', () => {
      const response = postQuestionValidator({ title: '', body: questionEntry.body });

      expect(response).to.have.keys(['code', 'errorMessages', 'errorMessage', 'type']);
      expect(response.code).to.eql(400);
      expect(response.errorMessages).to.have.lengthOf(1);
    });

    it('should return error if there is no body', () => {
      const response = postQuestionValidator({ title: questionEntry.title, body: '' });

      expect(response).to.have.keys(['code', 'errorMessages', 'errorMessage', 'type']);
      expect(response.code).to.eql(400);
      expect(response.errorMessages).to.have.lengthOf(1);
    });
  });

  context('Valid Entries', () => {
    it('should return empty errors if request body is valid', () => {
      const response = postQuestionValidator(questionEntry);

      expect(response.errorMessages).to.have.lengthOf(0);
    });
  });
});
