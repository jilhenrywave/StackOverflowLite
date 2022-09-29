/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const { User, Question } = require('../../db/model-handler');
const {
  questionModel,
  questionResponse,
  questions,
} = require('../test-cases/entities/question.entity');
const { id, title, body, token, questionId } = require('../test-cases/test-constants');
const { getUserTokenOptions, userAndToken } = require('../test-cases/entities/user.entity');

chai.use(chaiHttp);

describe('Question Endpoints', () => {
  before('Setting Stubs', () => {
    sandbox.stub(User, 'findByPk').withArgs(id, getUserTokenOptions).returns(userAndToken);
    sandbox.stub(Question, 'create').returns(questionModel);
    sandbox.stub(Question, 'findByPk').returns(questionResponse);
    sandbox.stub(Question, 'destroy').returns(1);
    sandbox
      .stub(Question, 'findAndCountAll')
      .returns({ count: new Array(questions.length).fill(0), rows: questions });
    sandbox.stub(Question, 'update').returns([1]);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should post questions', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({ title, body });

    expect(response).to.have.status(201);
    expect(response.body).to.eql(questionResponse);
  });

  it('should get questions', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/questions')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body.questions).to.have.lengthOf(questions.length);
    expect(response.body).to.have.keys(['totalCount', 'previous', 'next', 'questions']);
  });

  it('should get this user questions', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/questions/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body.questions).to.have.lengthOf(questions.length);
    expect(response.body).to.have.keys(['totalCount', 'previous', 'next', 'questions']);
  });

  it('should get a question', async () => {
    const response = await chai
      .request(server)
      .get(`/api/v1/questions/${questionId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.eql(questionResponse);
  });

  it('should update a question', async () => {
    const response = await chai
      .request(server)
      .patch(`/api/v1/questions/${questionId}/edit`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title });

    expect(response).to.have.status(200);
    expect(response.body).to.eql(questionResponse);
  });

  it('should delete a question', async () => {
    const response = await chai
      .request(server)
      .delete(`/api/v1/questions/${questionId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(204);
  });

  it('should delete all question', async () => {
    const response = await chai
      .request(server)
      .delete('/api/v1/questions/delete/all')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(204);
  });
});
