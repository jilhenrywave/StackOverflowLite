const { expect } = require('chai');
const questionFormatter = require('../../domains/question/formatters/post-question.formatter');
const { updateQuestionEntry, user } = require('../entities/question-test-entity');

/* eslint-disable no-undef */
describe('Post Question Formatter', () => {
  context('Valid Entries', () => {
    it('should return formatted body when arguments are valid', () => {
      const response = questionFormatter(updateQuestionEntry, user);

      expect(response).to.have.keys(['id', 'title', 'body', 'user']);
      expect(response.title).to.eql(updateQuestionEntry.title);
      expect(response.body).to.eql(updateQuestionEntry.body);
      expect(response.id).to.eql(updateQuestionEntry.id);
      expect(response.user).to.eql(user);
    });
  });
});
