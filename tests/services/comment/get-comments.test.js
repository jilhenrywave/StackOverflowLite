/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Comment } = require('../../../db/model-handler');
const getComments = require('../../../domains/comment/services/get-comments');
const {
  getCommentNoStartLimitArgs,
  comments,
  getCommentEmpty,
  getCommentStartLimitArgs,
} = require('../../test-cases/entities/comment.entity');
const {
  getCommentsNoId,
  getCommentsInvalidId,
  getCommentsEmpty,
  getCommentsValid,
  getCommentsWithQueries,
} = require('../../test-cases/services/comment-service-tc');

describe('Get Comments Service', () => {
  before('Setting Stubs', () => {
    const getStub = sandbox.stub(Comment, 'findAndCountAll');

    getStub.withArgs(getCommentNoStartLimitArgs).returns({ count: 5, rows: comments });
    getStub.withArgs(getCommentEmpty).returns({ count: 0, rows: [] });
    getStub.withArgs(getCommentStartLimitArgs).returns({ count: 1, rows: [comments[0]] });
    getStub.returns({ count: 0, rows: [] });
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if answer id is missing', async () => {
    const response = await getComments(getCommentsNoId);

    expect(response.code).to.eql(500);
  });

  it('should return error if answer id is not recognized', async () => {
    const response = await getComments(getCommentsInvalidId);

    expect(response.code).to.eql(404);
  });

  it('should return error if answer has no comment', async () => {
    const response = await getComments(getCommentsEmpty);

    expect(response.code).to.eql(404);
  });

  it('should return response object if args are valid', async () => {
    const response = await getComments(getCommentsValid);

    expect(response.totalCount).to.eql(comments.length);
    expect(response.answers[0]).to.eql(comments[0]);
  });

  it('should call database with queries', async () => {
    const response = await getComments(getCommentsWithQueries);

    expect(response.totalCount).to.eql(1);
    expect(response.answers[0]).to.eql(comments[0]);
  });
});
