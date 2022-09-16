/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const loginValidator = require('../validators/login-user.validator');
const { invalidPasswordEntries, invalidEmailEntries } = require('./test-cases/login-user-test-cases');
const loginUserService = require('../user/user-services/login-user');
const User = require('../user/User');
const { ERROR_MESSAGE } = require('../util/constants');

describe('Login User', () => {
  const user = { name: 'Jil Henry', password: '1234567', email: 'henry@jil.com' };

  before('Add User to Database', async () => {
    const hashPassword = await bcrypt.hash(user.password, 12);
    await User.create({ ...user, password: hashPassword });
  });

  after('Remove User to Database', async () => {
    await User.destroy({ where: { email: user.email } });
  });

  context('Request Validation', () => {
    invalidEmailEntries.forEach((entry) => {
      it('should return error when email is not valid', () => {
        const response = loginValidator(entry);

        expect(response).to.have.keys(['code', 'errorMessage', 'type', 'errorMessages']);
        expect(response.code).to.be.a('number');
        expect(response.errorMessages[0]).to.eql(ERROR_MESSAGE.invalidEmail);
        expect(response.errorMessages).to.have.lengthOf(1);
      });
    });

    invalidPasswordEntries.forEach((entry) => {
      it('should return error when password is not valid', () => {
        const response = loginValidator(entry);

        expect(response).to.have.keys(['code', 'errorMessage', 'type', 'errorMessages']);
        expect(response.code).to.be.a('number');
        expect(response.errorMessages[0]).to.eql(ERROR_MESSAGE.invalidPassword);
        expect(response.errorMessages).to.have.lengthOf(1);
      });
    });
  });

  context('Successful Authentication', () => {
    it('should return required response object when entry is valid', async () => {
      const response = await loginUserService(user);

      expect(response).to.have.keys(['user', 'token']);
      expect(response.user).to.have.keys(['id', 'email', 'name']);
      expect(response.token).not.to.be.empty;
      expect(response.user.email).to.eql(user.email);
    });
  });

  context('Unsuccessful Authentication', () => {
    it('should return authentication error object when email is incorrect', async () => {
      const response = await loginUserService({ email: 'henry@gmail.com', password: user.password });

      expect(response).to.have.keys(['errorMessage', 'code', 'type']);
      expect(response.code).to.eql(404);
      expect(response.errorMessage).to.eql(ERROR_MESSAGE.incorrectEmail);
    });

    it('should return authentication error object when password is incorrect', async () => {
      const response = await loginUserService({ email: user.email, password: 'wrongpassword' });

      expect(response).to.have.keys(['errorMessage', 'code', 'type']);
      expect(response.code).to.eql(401);
      expect(response.errorMessage).to.eql(ERROR_MESSAGE.incorrectPassword);
    });
  });
});
