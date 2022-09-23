/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Question } = require('../../../db/model-handler');
const { RequestError } = require('../../../util/error-handlers');
const { question, questionResponse } = require('../../entities/question-test-entity');
const { getQuestionServiceArgs } = require('../../test-cases/get-multiple-test-cases');
const getQuestion = require('../../../domains/question/services/get-question');

describe('Get Question Service', () => {
  before('Setting up stubs', () => {
    const questionStub = sandbox.stub(Question, 'findByPk');

    questionStub.withArgs(question.id, getQuestionServiceArgs).returns(questionResponse);
    questionStub.returns(new RequestError(404));
  });

  after('Removing stubs', () => {
    sandbox.restore();
  });

  it('should return error if id is not valid', async () => {
    const response = await getQuestion('some-id');

    expect(response).to.have.keys(['code', 'type', 'errorMessage']);
    expect(response.code).to.eql(404);
  });

  it('should return question object if id is valid', async () => {
    const response = await getQuestion(question.id);

    expect(response).to.eql(questionResponse);
  });
});
