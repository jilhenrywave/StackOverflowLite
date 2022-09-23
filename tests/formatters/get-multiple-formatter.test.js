/* eslint-disable no-undef */
const { expect } = require('chai');
const { validEntry } = require('../test-cases/get-multiple-test-cases');
const getMulitpleFormatter = require('../../middlewares/get-multiple.formatter');

describe('Get Multiple Formatter', () => {
  it('should format object appropriately', () => {
    const response = getMulitpleFormatter({ ...validEntry, ownerId: validEntry.id, questionId: 'some-q-id' });

    expect(response.ownerId).to.eql(validEntry.id);
    expect(response.sort).to.eql(validEntry.sort.toUpperCase().split('_'));
    expect(response.limit).to.be.a('number');
    expect(response.start).to.be.a('number');
  });
});
