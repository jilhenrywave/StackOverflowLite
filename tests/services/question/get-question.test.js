/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Question } = require('../../../db/model-handler');
const {
  getQuestionOptions,
  questionResponse,
} = require('../../test-cases/entities/question.entity');
const { questionId } = require('../../test-cases/test-constants');
const getQuestion = require('../../../domains/question/services/get-question');

describe('Get Question Service', () => {
  before('Setting Stubs', () => {
    const getStub = sandbox.stub(Question, 'findByPk');

    getStub.withArgs(questionId, getQuestionOptions).returns(questionResponse);
    getStub.returns(null);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if id is not recognized', async () => {
    const response = await getQuestion('some-question-id');

    expect(response.code).to.eql(404);
  });

  it('should return response object if id is valid', async () => {
    const response = await getQuestion(questionId);

    expect(response).to.eql(questionResponse);
  });
});
