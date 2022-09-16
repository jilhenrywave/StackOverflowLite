/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const bcrypt = require('bcrypt');
const { invalidEntries, validEntry } = require('./test-cases/register-user-test-cases');
const registerUserValidator = require('../validators/register-user.validator');
const registerUserFormatter = require('../formatters/register-user.formatter');
const registerUser = require('../user/user-services/register-user');
const User = require('../user/User');
const Token = require('../user/Token');

describe('Register User', () => {
  before('Setup Stubs', () => {
    const userDBStub = sandbox.stub(User, 'create');
    const tokenDBStub = sandbox.stub(Token, 'create');

    userDBStub.returns({ ...validEntry, id: 'some-id' });
    tokenDBStub.returns({ token: 'some-token' });
  });

  after('Clear Database', () => {
    sandbox.restore();
  });

  context('Bad entries', () => {
    Object.entries(invalidEntries).forEach(([title, entry]) => {
      it(`should return error if ${title} exists`, () => {
        const response = registerUserValidator(entry);
        const value = { ...response };

        expect(value).to.have.keys(['code', 'errorMessage', 'type', 'errorMessages']);
        expect(value.code).to.be.a('number');
      });
    });
  });

  context('Good Entry', () => {
    it('should return user object when entry is valid', async () => {
      const user = await registerUser(validEntry);

      expect(user).to.have.keys(['user', 'token']);
      expect(user.user).to.have.keys(['id', 'name', 'email']);
      expect(user.user).not.to.have.keys(['password', 'createdAt', 'modifiedAt']);
      expect(user.user.name).to.eql(validEntry.name);
      expect(user.user.email).to.eql(validEntry.email);
    });
  });

  context('Request Body Formatter', () => {
    it('should return same name and password', async () => {
      const formattedBody = await registerUserFormatter(validEntry);

      expect(formattedBody.name).to.eql(validEntry.name);
      expect(formattedBody.email).to.eql(validEntry.email);
    });

    it('should return passowrd hashed', async () => {
      const formattedBody = await registerUserFormatter(validEntry);
      const isPasswordHashed = await bcrypt.compare(validEntry.password, formattedBody.password);

      expect(formattedBody.password).not.to.eql(validEntry.password);
      expect(isPasswordHashed).to.be.true;
    });
  });
});
