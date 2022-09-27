/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Comment } = require('../../../db/model-handler');
const postComment = require('../../../domains/comment/services/post-comment');
const {
  createInvalidAnswerArgs,
  createInvalidUserArgs,
  createValidArgs,
  createOptionsArgs,
  commentModel,
  commentResponse,
} = require('../../test-cases/entities/comment.entity');
const {
  postCommentNoBody,
  postCommentNoParamId,
  postCommentInvalidAnswer,
  postCommentInvalidUser,
  postCommentValid,
} = require('../../test-cases/services/comment-service-tc');

describe('Post Comment Service', () => {
  before('Setting Stubs', () => {
    const error = new Error();
    error.name = 'SequelizeUniqueConstraintError';
    const createStub = sandbox.stub(Comment, 'create');

    createStub.withArgs(createInvalidAnswerArgs, createOptionsArgs).throws(error);
    createStub.withArgs(createInvalidUserArgs, createOptionsArgs).throws(error);
    createStub.withArgs(createValidArgs, createOptionsArgs).returns(commentModel);
    createStub.returns(null);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if comment body is missing', async () => {
    const response = await postComment(postCommentNoBody);

    expect(response.code).to.eql(500);
  });

  it('should return error if paramId is missing', async () => {
    const response = await postComment(postCommentNoParamId);

    expect(response.code).to.eql(500);
  });

  it('should return error if answer id is not recognized', async () => {
    const response = await postComment(postCommentInvalidAnswer);

    expect(response.code).to.eql(409);
  });

  it('should return error if user id is not recognized', async () => {
    const response = await postComment(postCommentInvalidUser);

    expect(response.code).to.eql(409);
  });

  it('should response object if arguments are valid', async () => {
    const response = await postComment(postCommentValid);

    expect(response).to.eql(commentResponse);
  });
});
