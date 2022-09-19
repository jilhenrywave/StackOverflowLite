/* eslint-disable no-undef */
const { expect } = require('chai');
const getDelQuestionValidator = require('../../domains/question/validators/get-del-question.validator');
const { user } = require('../entities/user-test-entity');

describe('Get Question Validator', () => {
  it('should return error if id is not valid', () => {
    const response = getDelQuestionValidator('some-id');

    expect(response).to.have.keys(['code', 'errorMessages', 'errorMessage', 'type']);
    expect(response.code).to.eql(400);
  });

  it('should not return error if id is valid', () => {
    const response = getDelQuestionValidator(user.id);

    expect(response).to.have.keys(['code', 'errorMessages', 'errorMessage', 'type']);
    expect(response.errorMessages).to.have.lengthOf(0);
  });
});
