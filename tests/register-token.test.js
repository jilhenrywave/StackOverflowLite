/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const { validEntry } = require('./test-cases/register-user-test-cases');
const registerToken = require('../user/token-services/register-token');
const User = require('../user/User');

describe('Register Token', () => {
  let user;

  before('Setup User record', async () => {
    user = await User.create(validEntry);
  });

  after('Remove User record', async () => {
    await User.destroy({ where: {} });
  });

  it('should return token when user id is valid', async () => {
    const response = await registerToken(user.id);
    expect(response).to.exist;
    expect(response).to.be.a('string');
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
