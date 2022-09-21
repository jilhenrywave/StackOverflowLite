/* eslint-disable no-undef */
const { expect } = require('chai');
const getMulitpleFormatter = require('../../middlewares/get-multiple.formatter');
const { validEntry } = require('../test-cases/get-multiple-test-cases');

describe('Get Multiple Formatter', () => {
  it('should format object appropriately', () => {
    const response = getMulitpleFormatter({ ...validEntry, ownerId: validEntry.id, questionId: 'some-q-id' });

    expect(response.ownerId).to.eql(validEntry.id);
    expect(response.sort).to.eql(validEntry.sort.toUpperCase());
    expect(response.limit).to.be.a('number');
    expect(response.start).to.be.a('number');
  });
});
