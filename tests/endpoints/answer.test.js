/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const { User, Question, Answer } = require('../../db/model-handler');
const { id, token, answer, name } = require('../test-cases/test-constants');
const { getUserTokenOptions, userAndToken } = require('../test-cases/entities/user.entity');
const {
  answerModel,
  answerResponses,
  answerResponse,
} = require('../test-cases/entities/answer.entity');

chai.use(chaiHttp);

const answerResponseUser = { ...answerResponse, user: { id, name } };

describe('Answer Endpoints', () => {
  before('Setting Stubs', () => {
    sandbox.stub(User, 'findByPk').withArgs(id, getUserTokenOptions).returns(userAndToken);
    sandbox.stub(Question, 'update').returns([1]);
    sandbox.stub(Answer, 'findByPk').returns(answerModel);
    sandbox.stub(Answer, 'destroy').returns(1);
    sandbox
      .stub(Answer, 'findAndCountAll')
      .returns({ count: answerResponses.length, rows: answerResponses });
    sandbox.stub(Answer, 'create').returns(answerModel);
    sandbox.stub(Answer, 'update').returns([1]);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should post answer', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/questions/ad99293a-d73a-4bc2-9ed5-8e0ea3ebea9d/answers')
      .set('Authorization', `Bearer ${token}`)
      .send({ answer });

    expect(response).to.have.status(201);
    expect(response.body).to.eql(answerResponseUser);
  });

  it('should get user answers', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/answers/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body.answers).to.have.lengthOf(answerResponses.length);
    expect(response.body).to.have.keys(['totalCount', 'count', 'answers']);
  });

  it('should get answers to a question', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/questions/ad99293a-d73a-4bc2-9ed5-8e0ea3ebea9d/answers')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body.answers).to.have.lengthOf(answerResponses.length);
    expect(response.body).to.have.keys(['totalCount', 'count', 'answers']);
  });

  it('should accept an answer', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/answers/084924ae-4883-4c20-a6e6-84cd382a8b59/accept')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(204);
  });

  it('should update an answer', async () => {
    const response = await chai
      .request(server)
      .patch('/api/v1/answers/03365f47-76b8-415b-bbaf-990640ccf48e/edit')
      .set('Authorization', `Bearer ${token}`)
      .send({ answer });

    expect(response).to.have.status(200);
    expect(response.body).to.eql(answerModel);
  });

  it('should delete an answer', async () => {
    const response = await chai
      .request(server)
      .delete('/api/v1/answers/03365f47-76b8-415b-bbaf-990640ccf48e')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(204);
  });
});
