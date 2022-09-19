/* eslint-disable no-undef */
const { expect } = require('chai');
const getUserQuestionsFormatter = require('../../domains/question/formatters/get-user-questions.formatter');
const { validEntry } = require('../test-cases/get-questions-test-cases');
const { user } = require('../entities/user-test-entity');

describe('Get User Questions Formatter', () => {
  it('should format object appropriately', () => {
    const response = getUserQuestionsFormatter(user, validEntry);

    expect(response.ownerId).to.eql(user.id);
    expect(response.sort).to.eql(validEntry.sort.toUpperCase());
    expect(response.limit).to.be.a('number');
    expect(response.start).to.be.a('number');
  });
});
