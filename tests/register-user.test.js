/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const { invalidEntries, validEntry } = require('./test-cases/register-user-test-cases');
const registerUser = require('../user/user-services/register-user');
const User = require('../user/User');

describe('Register User', () => {
  after('Clear Database', async () => {
    await User.destroy({
      where: {},
    });
  });

  context('Bad entries', () => {
    Object.entries(invalidEntries).forEach(([title, entry]) => {
      it(`should return error if ${title} exists`, async () => {
        const value = await registerUser(entry);

        expect(value).to.have.keys(['code', 'errorMessage', 'type']);
        expect(value.code).to.be.a('number');
        expect(value.message).not.to.be.empty;
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
});
