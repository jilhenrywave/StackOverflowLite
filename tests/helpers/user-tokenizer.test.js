/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const jsonWebToken = require('jsonwebtoken');
const sandbox = require('sinon').createSandbox();
const { id } = require('../test-cases/test-constants');
const userTokenizer = require('../../domains/user/user-tokenizer');

describe('User Tokenizer', () => {
  const payload = { id };
  const secretKey = process.env.JWT_KEY;
  const token = 'some-very-valid-long-token';

  before('Setting stubs', () => {
    const jwtSignStub = sandbox.stub(jsonWebToken, 'sign');
    const jwtVerifyStub = sandbox.stub(jsonWebToken, 'verify');

    jwtSignStub.withArgs(payload, secretKey, { expiresIn: '20 days' }).returns(token);
    jwtVerifyStub.withArgs(token, secretKey).returns(payload);
  });

  after('Removing stubs', () => {
    sandbox.restore();
  });

  it('should return valid token if payload is valid', () => {
    const tokenResponse = userTokenizer.generateToken(payload);

    expect(tokenResponse).to.eql(token);
  });

  it('should return null if payload is not passed', () => {
    const tokenResponse = userTokenizer.generateToken();

    expect(tokenResponse).to.be.null;
  });

  it('should return payload if token is valid', () => {
    const tokenResponse = userTokenizer.parseToken(token);

    expect(tokenResponse).to.eql(payload);
  });

  it('should return null if token is invalid', () => {
    const tokenResponse = userTokenizer.parseToken('some-token');

    expect(tokenResponse).to.be.undefined;
  });
});
