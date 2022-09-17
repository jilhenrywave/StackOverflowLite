/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const { expect } = require('chai');
const { invalidEntries, validEntry } = require('../test-cases/user-profile-test-cases');
const profileFormatter = require('../../util/formatters/user-profile.formatter');

describe('User Proile Formatter', () => {
  context('Valid Entries', () => {
    it('should return same name and email and hashed password', async () => {
      const formattedBody = await profileFormatter(validEntry);
      const isPasswordHashed = await bcrypt.compare(validEntry.password, formattedBody.password);

      expect(formattedBody.name).to.eql(validEntry.name);
      expect(formattedBody.email).to.eql(validEntry.email);
      expect(formattedBody.password).not.to.eql(validEntry.password);
      expect(isPasswordHashed).to.be.true;
    });

    it('should return hashed password only', async () => {
      const formattedBody = await profileFormatter({ password: validEntry.password });
      const isPasswordHashed = await bcrypt.compare(validEntry.password, formattedBody.password);

      expect(formattedBody).to.have.key('password');
      expect(formattedBody.password).not.to.eql(validEntry.password);
      expect(isPasswordHashed).to.be.true;
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
