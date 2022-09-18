/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const bcrypt = require('bcrypt');
const { expect } = require('chai');
const { invalidEntries, validEntry } = require('../test-cases/user-profile-test-cases');
const { hashedPassword } = require('../entities/user-test-entity');
const profileFormatter = require('../../user/fomatters/user-profile.formatter');

describe('User Proile Formatter', () => {
  before('Setting up stubs', () => {
    const bcryptHashStub = sandbox.stub(bcrypt, 'hash');
    const bcryptCompareStub = sandbox.stub(bcrypt, 'compare');

    bcryptHashStub.withArgs(validEntry.password).returns(hashedPassword);
    bcryptCompareStub.withArgs(validEntry.password, hashedPassword).returns(true);
  });

  after('Removing stubs', () => {
    sandbox.restore();
  });

  context('Valid Entries', () => {
    it('should return same name and email and hashed password', async () => {
      const formattedBody = await profileFormatter(validEntry);

      expect(formattedBody.name).to.eql(validEntry.name);
      expect(formattedBody.email).to.eql(validEntry.email);
      expect(formattedBody.password).to.eql(hashedPassword);
    });

    it('should return hashed password only', async () => {
      const formattedBody = await profileFormatter({ password: validEntry.password });

      expect(formattedBody).to.have.key('password');
      expect(formattedBody.password).to.eql(hashedPassword);
    });

    it('should return email only', async () => {
      const formattedBody = await profileFormatter({ email: validEntry.email });

      expect(formattedBody).to.have.key('email');
      expect(formattedBody.email).to.eql(validEntry.email);
    });

    it('should return name only', async () => {
      const formattedBody = await profileFormatter({ name: validEntry.name });

      expect(formattedBody).to.have.key('name');
      expect(formattedBody.name).to.eql(validEntry.name);
    });
  });

  context('Invalid Entries', () => {
    it('should return error if password is not string', async () => {
      const error = await profileFormatter({ password: 12344 });

      expect(error).to.have.keys(['code', 'errorMessage', 'type']);
      expect(error.code).to.eql(500);
    });

    it('should return empty object if no arg is passed', async () => {
      const response = await profileFormatter(invalidEntries.missingEntries);

      expect(response).to.be.empty;
    });
  });
});
