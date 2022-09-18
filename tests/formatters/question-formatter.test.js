const { expect } = require('chai');
const questionFormatter = require('../../question/formatters/question.formatter');
const { questionEntry, user } = require('../entities/question-test-entity');

/* eslint-disable no-undef */
describe('Question Formatter', () => {
  context('Valid Entries', () => {
    it('should return formatted body when arguments are valid', () => {
      const response = questionFormatter(questionEntry, user);

      expect(response).to.have.keys(['title', 'body', 'user']);
      expect(response.title).to.eql(questionEntry.title);
      expect(response.body).to.eql(questionEntry.body);
    });
  });

  context('Invalid Entries', () => {
    it('should return error if any arguments are missing', () => {
      const response = questionFormatter(user);

      expect(response).to.have.keys(['errorMessage', 'code', 'type']);
      expect(response.code).to.eql(400);
    });
  });
});
