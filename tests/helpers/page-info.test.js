/* eslint-disable no-undef */
const { expect } = require('chai');
const { createPageInfo } = require('../../util/page-info-helper');
const pageInfoTestCases = require('../test-cases/page-info-tc');

describe('Page Info Helper', () => {
  Object.entries(pageInfoTestCases).forEach(([key, value]) => {
    it(`should return correct object for ${key} test case`, () => {
      const { recordCount, start, limit } = value.input;
      const response = createPageInfo(recordCount, start, limit);

      expect(response).to.eql(value.output);
    });
  });
});
