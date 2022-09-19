/* eslint-disable no-undef */
const { expect } = require('chai');
const getQuestionFormatter = require('../../question/formatters/get-question.formatter');
const { validEntry } = require('../test-cases/get-questions-test-cases');

describe('Get Question Formatter', () => {
  it('should format object appropriately', () => {
    const response = getQuestionFormatter(validEntry);

    expect(response.ownerId).to.eql(validEntry.ownerId);
    expect(response.sort).to.eql(validEntry.sort.toUpperCase());
    expect(response.limit).to.be.a('number');
    expect(response.start).to.be.a('number');
  });
});
