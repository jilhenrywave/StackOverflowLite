/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Comment } = require('../../../db/model-handler');
const deleteComment = require('../../../domains/comment/services/delete-comment');
const { deleteArgs } = require('../../test-cases/entities/comment.entity');
const {
  deleteCommentNoId,
  deleteCommentNoOwner,
  deleteCommentInvalidOwner,
  deleteCommentValidArgs,
} = require('../../test-cases/services/comment-service-tc');

describe('Delete Comment Service', () => {
  before('Setting Stubs', () => {
    const deleteStub = sandbox.stub(Comment, 'destroy');

    deleteStub.withArgs(deleteArgs).returns(1);
    deleteStub.returns(0);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if paramId is missing', async () => {
    const response = await deleteComment(deleteCommentNoId);

    expect(response.code).to.eql(500);
  });

  it('should return error if ownerId is missing', async () => {
    const response = await deleteComment(deleteCommentNoOwner);

    expect(response.code).to.eql(500);
  });

  it('should return error if comment does not belong to user', async () => {
    const response = await deleteComment(deleteCommentInvalidOwner);

    expect(response.code).to.eql(422);
  });

  it('should return no error if arguments are valid', async () => {
    const response = await deleteComment(deleteCommentValidArgs);

    expect(response).to.eql({});
  });
});
