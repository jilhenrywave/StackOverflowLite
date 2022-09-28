/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { Token } = require('../../../db/model-handler');
const logoutUser = require('../../../domains/user/user-services/logout-user');
const {
  removeAllTokensOptions,
  removeOneTokenptions,
} = require('../../test-cases/entities/user.entity');
const {
  logoutUserInvalidIdArgs,
  logoutUserInvalidTokenArgs,
  logoutUserMissingTokenArgs,
  logoutUserAllTokenArgs,
  logoutUserOneTokenArgs,
} = require('../../test-cases/services/user-service-tc');

describe('Logout User Service', () => {
  before('Setting Stubs', () => {
    const deleteTokenStub = sandbox.stub(Token, 'destroy');

    deleteTokenStub.withArgs(removeAllTokensOptions).returns(5);
    deleteTokenStub.withArgs(removeOneTokenptions).returns(1);
    deleteTokenStub.returns(0);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if id is not valid', async () => {
    const response = await logoutUser(logoutUserInvalidIdArgs);

    expect(response.code).to.eql(422);
  });

  it('should return error if token is not valid', async () => {
    const response = await logoutUser(logoutUserInvalidTokenArgs);

    expect(response.code).to.eql(422);
  });

  it('should return error if token is missing', async () => {
    const response = await logoutUser(logoutUserMissingTokenArgs);

    expect(response.code).to.eql(500);
  });

  it('should remove all token if all param is true', async () => {
    const response = await logoutUser(logoutUserAllTokenArgs);

    expect(response).to.have.key('message');
  });

  it('should remove one token if all param is false', async () => {
    const response = await logoutUser(logoutUserOneTokenArgs);

    expect(response).to.have.key('message');
  });
});
