/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const Token = require('../../../domains/user/models/Token');
const logoutUser = require('../../../domains/user/user-services/logout-user');
const { userWithToken } = require('../../entities/user-test-entity');

describe('Logout User', () => {
  const { id, token } = userWithToken;

  before('Setup Stubs', () => {
    const tokenDBStub = sandbox.stub(Token, 'destroy');
    tokenDBStub.returns(0);
  });

  after('Restore Token Object', () => {
    sandbox.restore();
  });

  it('should return object with message if argument object has id and token', async () => {
    const response = await logoutUser({ id, token });

    expect(response).to.have.key('message');
  });

  it('should return error object if called with wrong object argument', async () => {
    const response = await logoutUser({ userId: '' });

    expect(response).to.have.keys(['code', 'errorMessage', 'type']);
    expect(response.code).to.eql(500);
  });
});
