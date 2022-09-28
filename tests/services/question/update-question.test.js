/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Question } = require('../../../db/model-handler');
const updateQuestion = require('../../../domains/question/services/update-question');
const {
  updateArgs,
  updateOptions,
  questionResponse,
} = require('../../test-cases/entities/question.entity');
const {
  updateQuestionInvalidId,
  updateQuestionInvalidOwner,
  updateQuestionValidArgument,
} = require('../../test-cases/services/question-service-tc');

describe('Update Question Service', () => {
  before('Setting Stubs', () => {
    const updateStub = sandbox.stub(Question, 'update');
    const getStub = sandbox.stub(Question, 'findByPk');

    updateStub.withArgs(updateArgs, updateOptions).returns([1]);
    updateStub.returns([0]);

    getStub.returns(questionResponse);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if question id is not valid', async () => {
    const response = await updateQuestion(updateQuestionInvalidId);

    expect(response.code).to.eql(422);
  });

  it('should return error if question does not belong to user', async () => {
    const response = await updateQuestion(updateQuestionInvalidOwner);

    expect(response.code).to.eql(422);
  });

  it('should return response object if arguments are valid', async () => {
    const response = await updateQuestion(updateQuestionValidArgument);

    expect(response).to.eql(questionResponse);
  });
});
