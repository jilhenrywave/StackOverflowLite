/* eslint-disable no-undef */
const { expect } = require('chai');
const { user } = require('../entities/user-test-entity');
const { validEntry, formattedResponse } = require('../test-cases/post-answer-test-cases');
const postAnswerFormatter = require('../../domains/answer/formatters/post-answer.formatter');

describe('Post Answer Formatter', () => {
  it('should format request well', () => {
    const response = postAnswerFormatter(validEntry, user);

    expect(response).to.eql(formattedResponse);
  });
});
