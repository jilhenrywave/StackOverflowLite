/* eslint-disable import/order */
/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { Question, Answer } = require('../../../db/model-handler');
const {
  answerModel,
  findByPkArgs,
  updateQuestionAnswer,
} = require('../../test-cases/entities/answer.entity');
const {
  acceptAnswerInvalidAnswerId,
  acceptAnswerInvalidOwner,
  accceptAnswerValidArgs,
  accceptAnswerRejectArgs,
} = require('../../test-cases/services/answer-service-tc');
const acceptAnswer = require('../../../domains/answer/services/accept-answer');

describe('Accept Answer Service', () => {
  before('Setting Stubs', () => {
    const findByPkStub = sandbox.stub(Answer, 'findByPk');
    const updateQuestionStub = sandbox.stub(Question, 'update');

    findByPkStub.withArgs(answerModel.id, findByPkArgs).returns(answerModel);
    findByPkStub.returns(undefined);

    updateQuestionStub.withArgs({ answerId: answerModel.id }, updateQuestionAnswer).returns([1]);

    updateQuestionStub.withArgs({ answerId: null }, updateQuestionAnswer).returns([1]);
    updateQuestionStub.returns([0]);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if answer id is not recognized', async () => {
    const response = await acceptAnswer(acceptAnswerInvalidAnswerId);

    expect(response.code).to.eql(400);
  });

  it('should return error if answer does not belong to owner', async () => {
    const response = await acceptAnswer(acceptAnswerInvalidOwner);

    expect(response.code).to.eql(422);
  });

  it('should return response object if id and ownerId is valid', async () => {
    const response = await acceptAnswer(accceptAnswerValidArgs);

    expect(response).to.eql({});
  });

  it('should reject answer appropriately', async () => {
    const response = await acceptAnswer(accceptAnswerRejectArgs);

    expect(response).to.eql({});
  });
});
