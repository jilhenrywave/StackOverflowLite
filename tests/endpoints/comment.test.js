/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const { User, Comment } = require('../../db/model-handler');
const { id, token, comment, name } = require('../test-cases/test-constants');
const { getUserTokenOptions, userAndToken } = require('../test-cases/entities/user.entity');
const {
  comments,
  commentResponse,
  commentModel,
} = require('../test-cases/entities/comment.entity');

chai.use(chaiHttp);

describe('Comment Endpoints', () => {
  before('Setting Stubs', () => {
    sandbox.stub(User, 'findByPk').withArgs(id, getUserTokenOptions).returns(userAndToken);
    sandbox.stub(Comment, 'destroy').returns(1);
    sandbox.stub(Comment, 'findAndCountAll').returns({ count: comments.length, rows: comments });
    sandbox.stub(Comment, 'create').returns(commentModel);
    sandbox.stub(Comment, 'update').returns([1]);
    sandbox.stub(Comment, 'findByPk').returns(commentResponse);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should post comment', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/answers/c153d3b0-1901-4e9e-843f-a2aa34fc014f/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({ comment });

    expect(response).to.have.status(201);
    expect(response.body).to.eql({ ...commentResponse, owner: { id, name } });
  });

  it('should get answer comments', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/answers/c153d3b0-1901-4e9e-843f-a2aa34fc014f/comments')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body.comments).to.have.lengthOf(comments.length);
    expect(response.body).to.have.keys(['totalCount', 'count', 'comments']);
  });

  it('should update a comment', async () => {
    const response = await chai
      .request(server)
      .patch('/api/v1/comments/095f67b6-5ffa-4f00-92ab-f4803ddd2471/edit')
      .set('Authorization', `Bearer ${token}`)
      .send({ comment });

    expect(response).to.have.status(200);
    expect(response.body).to.eql(commentResponse);
  });

  it('should delete a comment', async () => {
    const response = await chai
      .request(server)
      .delete('/api/v1/comments/095f67b6-5ffa-4f00-92ab-f4803ddd2471')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response).to.have.status(204);
  });
});
