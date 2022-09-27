/* eslint-disable import/order */
/* eslint-disable no-undef */
const { expect } = require('chai');
const { Answer } = require('../../../db/model-handler');
const deleteAnswer = require('../../../domains/answer/services/delete-answer');
const sandbox = require('sinon').createSandbox();
const { deleteArgs } = require('../../test-cases/entities/answer.entity');
const {
  deleteAnswerInvalidArgs,
  deleteAnswerValidArgs,
} = require('../../test-cases/services/answer-service-tc');

describe('Delete Answer Service', () => {
  before('Setting Stubs', () => {
    const deleteStub = sandbox.stub(Answer, 'destroy');

    deleteStub.withArgs(deleteArgs).returns(1);
    deleteStub.returns(0);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if answerId or ownerid is not valid', async () => {
    const response = await deleteAnswer(deleteAnswerInvalidArgs);

    expect(response.code).to.eql(422);
  });

  it('should return response object if answerId and ownerId is valid', async () => {
    const response = await deleteAnswer(deleteAnswerValidArgs);

    expect(response).to.eql({});
  });
});
