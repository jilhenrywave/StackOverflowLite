const { expect } = require('chai');
const deleteQuestionFormatter = require('../../domains/question/formatters/delete-question.formatter');
const { question } = require('../entities/question-test-entity');
const { user } = require('../entities/user-test-entity');

/* eslint-disable no-undef */
describe('Delete Question Formatter', () => {
  it('should format request well', () => {
    const response = deleteQuestionFormatter(question.id, user);

    expect(response).to.eql({ id: question.id, ownerId: user.id });
  });
});
