/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const tokenizer = require('../util/user-tokenizer');

describe('Tokenizer', () => {
  const payload = { id: '123456' };
  let token = '';

  context('Generating tokens', () => {
    it('should generate token given a payload', () => {
      const generatedToken = tokenizer.generateToken(payload);
      token = generatedToken;
      expect(generatedToken).to.be.a('string');
      expect(generatedToken).not.to.be.empty;
    });

    it('should fail if no payload is given', () => {
      const generatedToken = tokenizer.generateToken();
      expect(generatedToken).to.be.null;
    });
  });

  context('Parsing tokens', () => {
    it('should return payload when given a valid token', () => {
      const value = tokenizer.parseToken(token).id;
      expect({ id: value }).to.eql(payload);
    });

    it('should return null when token is not valid', () => {
      const generatedPayload = tokenizer.parseToken('invalidToken');
      expect(generatedPayload).to.be.null;
    });

    it('should return null when token is not given', () => {
      const generatedPayload = tokenizer.parseToken();
      expect(generatedPayload).to.be.null;
    });
  });
});
