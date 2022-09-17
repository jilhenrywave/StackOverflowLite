/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const registerToken = require('../user/token-services/register-token');
const Token = require('../user/models/Token');

describe('Register Token', () => {
  const userId = 'some-user-id';
  const token = 'some-useful-token';

  before('Setup Stub', () => {
    const tokenDBStub = sandbox.stub(Token, 'create');
    tokenDBStub.returns({ token });
  });

  after('Restore Token object', () => {
    sandbox.restore();
  });

  it('should return token when user id is valid', async () => {
    const response = await registerToken(userId);
    expect(response).to.exist;
    expect(response).to.eql(token);
  });

  it('should return error when user id is not valid or empty', () => {
    try {
      registerToken();
    } catch (e) {
      expect(e.errorMessage).to.eql('Internal Error: Could not register token');
      expect(e.code).to.eql(500);
    }
  });
});
