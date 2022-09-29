/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const bcrypt = require('bcrypt');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const { User, Token } = require('../../db/model-handler');
const {
  user,
  userAndToken,
  userWithToken,
  getUserTokenOptions,
  userWithPassword,
} = require('../test-cases/entities/user.entity');
const {
  id,
  token,
  hashedPassword,
  name,
  email,
  password,
} = require('../test-cases/test-constants');

chai.use(chaiHttp);

describe('User Endpoints', () => {
  before('Setting Stubs', () => {
    sandbox.stub(User, 'create').returns(user);
    const findByPkStub = sandbox.stub(User, 'findByPk');
    findByPkStub.withArgs(id, getUserTokenOptions).returns(userAndToken);
    findByPkStub.returns(user);
    sandbox.stub(User, 'destroy').returns(1);
    sandbox.stub(User, 'findOne').returns(userWithPassword);
    sandbox.stub(bcrypt, 'compare').returns(true);
    sandbox.stub(bcrypt, 'hash').returns(hashedPassword);
    sandbox.stub(Token, 'create').returns({ token });
    sandbox.stub(Token, 'destroy').returns(1);
    sandbox.stub(User, 'update').returns([1]);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should create user', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/users')
      .send({ name, email, password });

    expect(response).to.have.status(201);
    expect(response.body).to.eql(userWithToken);
  });

  it('should login user', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/users/login')
      .send({ email, password });

    expect(response).to.have.status(200);
    expect(response.body).to.eql(userWithToken);
  });

  it('should logout user', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/users/logout')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.key('message');
  });

  it('should logout all user', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/users/logout/all')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.key('message');
  });

  it('should get this user', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.key(userWithToken);
  });

  it('should get user', async () => {
    const response = await chai
      .request(server)
      .get(`/api/v1/users?id=${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.key(user);
  });

  it('should update user', async () => {
    const response = await chai
      .request(server)
      .patch('/api/v1/users/me/edit')
      .set('Authorization', `Bearer ${token}`)
      .send({ name });

    expect(response).to.have.status(200);
    expect(response.body).to.have.key(user);
  });

  it('should delete user', async () => {
    const response = await chai
      .request(server)
      .delete('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(204);
  });
});
