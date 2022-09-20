/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const Token = require('../../../domains/user/models/Token');
const removeToken = require('../../../domains/user/token-services/remove-token');

describe('Remove Token', () => {
  const userId = '123456789';
  const token = 'someToken124***';

  before('Setup Stubs', () => {
    const tokenDBStub = sandbox.stub(Token, 'destroy');
    tokenDBStub.returns(0);
    tokenDBStub.withArgs({ where: { token } }).returns(1);
    tokenDBStub.withArgs({ where: { userId } }).returns(4);
  });

  after('Restore Token Object', () => {
    sandbox.restore();
  });

  context('Valid Arguments', () => {
    it('should return one when userId is undefined', async () => {
      const affectedRows = await removeToken(token);

      expect(affectedRows).to.eql(1);
    });

    it('should remove four when userId is defined', async () => {
      const affectedRows = await removeToken(token, userId);

      expect(affectedRows).to.eql(4);
    });
  });

  context('Invalid Arguments', () => {
    it('should throw exception when no argument is supplied', async () => {
      try {
        await removeToken();
      } catch (e) {
        expect(e.code).to.eql(500);
        expect(e.type).to.eql('ServerError');
      }
    });

    it('should return zero  if token is invalid', async () => {
      const affectedRows = await removeToken('invalidToken');
      expect(affectedRows).to.eql(0);
    });

    it('should return zero  if userId is invalid', async () => {
      const affectedRows = await removeToken(token, 'invalidUser');
      expect(affectedRows).to.eql(0);
    });
  });
});
