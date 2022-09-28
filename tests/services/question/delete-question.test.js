/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Question } = require('../../../db/model-handler');
const { deleteAllArgs, deleteOneArgs } = require('../../test-cases/entities/question.entity');
const { deleteInvalidIdArg, deleteInvalidOwnerArg, deleteManyValidArg, deleteOneValidArg } = require('../../test-cases/services/question-service-tc');
const deleteQuestion = require('../../../domains/question/services/delete-question');

describe('Delete Question Service', () => {
  before('Setting Stubs', () => {
    const deleteStub = sandbox.stub(Question, 'destroy');

    deleteStub.withArgs(deleteAllArgs).returns(5);
    deleteStub.withArgs(deleteOneArgs).returns(1);
    deleteStub.returns(0);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if id is wrong', async () => {
    const response = await deleteQuestion(deleteInvalidIdArg);

    expect(response.code).to.eql(422);
  });

  it('should return error if question is does not belong to user', async () => {
    const response = await deleteQuestion(deleteInvalidOwnerArg);

    expect(response.code).to.eql(422);
  });

  it('should delete many if all is true', async () => {
    const response = await deleteQuestion(deleteManyValidArg);

    expect(response).to.eql({});
  });

  it('should delete one if all is false', async () => {
    const response = await deleteQuestion(deleteOneValidArg);

    expect(response).to.eql({});
  });
});
