/* eslint-disable import/order */
/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { Answer } = require('../../../db/model-handler');
const { updateArgs, answerModel } = require('../../test-cases/entities/answer.entity');
const { answer } = require('../../test-cases/test-constants');
const updateAnswer = require('../../../domains/answer/services/update-answer');
const {
  updateAnswerNoId,
  updateAnswerNoBody,
  updateAnswerInvalidOwner,
  updateAnswerValidArgs,
} = require('../../test-cases/services/answer-service-tc');

describe('Update Answer Service', () => {
  before('Setting Stubs', () => {
    const updateAnswerStub = sandbox.stub(Answer, 'update');
    const getAnswerStub = sandbox.stub(Answer, 'findByPk');

    updateAnswerStub.withArgs({ body: answer }, updateArgs).returns([1]);
    updateAnswerStub.returns([0]);

    getAnswerStub.returns(answerModel);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if there are no paramId', async () => {
    const response = await updateAnswer(updateAnswerNoId);

    expect(response.code).to.eql(500);
  });

  it('should return error if there is no answerBody', async () => {
    const response = await updateAnswer(updateAnswerNoBody);

    expect(response.code).to.eql(500);
  });
  it('should return error if answer does not belong to user', async () => {
    const response = await updateAnswer(updateAnswerInvalidOwner);

    expect(response.code).to.eql(422);
  });
  it('should return answer object if arguments are valid', async () => {
    const response = await updateAnswer(updateAnswerValidArgs);

    expect(response).to.eql(answerModel);
  });
});
