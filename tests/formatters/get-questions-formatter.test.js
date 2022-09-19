/* eslint-disable no-undef */
const { expect } = require('chai');
const getQuestionsFormatter = require('../../domains/question/formatters/get-questions.formatter');
const { validEntry } = require('../test-cases/get-questions-test-cases');

describe('Get Questions Formatter', () => {
  it('should format object appropriately', () => {
    const response = getQuestionsFormatter(validEntry);

    expect(response.ownerId).to.eql(validEntry.ownerId);
    expect(response.sort).to.eql(validEntry.sort.toUpperCase());
    expect(response.limit).to.be.a('number');
    expect(response.start).to.be.a('number');
  });
});
