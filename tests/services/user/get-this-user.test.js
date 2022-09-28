/* eslint-disable no-undef */
const { expect } = require('chai');
const getThisUser = require('../../../domains/user/user-services/get-this-user');
const {
  getThisUserNoIdArgs,
  getThisUserNoEmailArgs,
  getThisUserNoTokenArgs,
  getThisUserValidArgs,
} = require('../../test-cases/services/user-service-tc');
const { userWithToken } = require('../../test-cases/entities/user.entity');

describe('Get This User Service', () => {
  it('should return error if id is missing', () => {
    const response = getThisUser(getThisUserNoIdArgs);

    expect(response.code).to.eql(500);
  });

  it('should return error if email is missing', () => {
    const response = getThisUser(getThisUserNoEmailArgs);

    expect(response.code).to.eql(500);
  });

  it('should return error if token is missing', () => {
    const response = getThisUser(getThisUserNoTokenArgs);

    expect(response.code).to.eql(500);
  });

  it('should return response object if arguments are valid', () => {
    const response = getThisUser(getThisUserValidArgs);

    expect(response).to.eql(userWithToken);
  });
});
