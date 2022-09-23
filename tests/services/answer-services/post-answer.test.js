/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Answer } = require('../../../db/model-handler');
const { RequestError } = require('../../../util/error-handlers');
const { user, answerModel, responseObject } = require('../../entities/answer-test-entity');
const { validEntry, formattedResponse } = require('../../test-cases/post-answer-test-cases');
const postAnswer = require('../../../domains/answer/services/post-answer');

describe('Post Answer Service', () => {
  before('Setting up stubs', () => {
    const postAnswerStub = sandbox.stub(Answer, 'create');

    const { answer, questionId } = validEntry;
    postAnswerStub.withArgs({ body: answer, questionId, ownerId: user.id }).returns(answerModel);
    postAnswerStub.throws(new RequestError(400, 'Error'));
  });

  after('Removing stubs', () => {
    sandbox.restore();
  });

  it('should create answer response object if params are valid', async () => {
    const response = await postAnswer(formattedResponse);

    expect(response).to.eql(responseObject);
  });

  it('should return error if question id doesn’t exist', async () => {
    const response = await postAnswer({ ...formattedResponse, questId: 'some-fake-id' });

    expect(response).to.have.keys(['code', 'type', 'errorMessage']);
    expect(response.code).to.eql(400);
  });

  it('should return error if answer or questionId is not given', async () => {
    const response = await postAnswer({ ...formattedResponse, questId: '' });

    expect(response).to.have.keys(['code', 'type', 'errorMessage']);
    expect(response.code).to.eql(500);
  });
});
