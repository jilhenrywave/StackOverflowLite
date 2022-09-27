/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Comment } = require('../../../db/model-handler');
const updateComment = require('../../../domains/comment/services/update-comment');
const {
  updateInvalidAnswerIdArgs,
  updateInvaliduserIdArgs,
  updateValidArgs,
  commentResponse,
} = require('../../test-cases/entities/comment.entity');
const {
  postCommentNoBody,
  postCommentNoParamId,
  postCommentInvalidAnswer,
  postCommentInvalidUser,
  postCommentValid,
} = require('../../test-cases/services/comment-service-tc');
const { comment } = require('../../test-cases/test-constants');

describe('Update Comment Service', () => {
  before('Setting Stubs', () => {
    const error = new Error();
    error.name = 'SequelizeUniqueConstraintError';

    const update = { body: comment };
    const updateStub = sandbox.stub(Comment, 'update');
    const findByPkStub = sandbox.stub(Comment, 'findByPk');

    updateStub.withArgs(update, updateInvalidAnswerIdArgs).returns([0]);
    updateStub.withArgs(update, updateInvaliduserIdArgs).returns([0]);
    updateStub.withArgs(update, updateValidArgs).returns([1]);
    updateStub.returns(null);

    findByPkStub.returns(commentResponse);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if comment body is missing', async () => {
    const response = await updateComment(postCommentNoBody);

    expect(response.code).to.eql(500);
  });

  it('should return error if paramId is missing', async () => {
    const response = await updateComment(postCommentNoParamId);

    expect(response.code).to.eql(500);
  });

  it('should return error if answer id is not recognized', async () => {
    const response = await updateComment(postCommentInvalidAnswer);

    expect(response.code).to.eql(422);
  });

  it('should return error if user id is not recognized', async () => {
    const response = await updateComment(postCommentInvalidUser);

    expect(response.code).to.eql(422);
  });

  it('should response object if arguments are valid', async () => {
    const response = await updateComment(postCommentValid);

    expect(response).to.eql(commentResponse);
  });
});
