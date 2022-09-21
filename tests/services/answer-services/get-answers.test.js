/* eslint-disable max-len */
/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const Answer = require('../../../domains/answer/models/Answer');
const testCase = require('../../test-cases/get-answers-test-cases');
const { answers } = require('../../entities/answer-test-entity');
const getAnswers = require('../../../domains/answer/services/get-answers');

describe('Get Answers Service', () => {
  const count = Array(10).fill(10);
  before('Setting up stubs', () => {
    const answerStub = sandbox.stub(Answer, 'findAndCountAll');

    answerStub.withArgs(testCase.serviceArgsOwner).returns({ count, rows: [answers[0]] });
    answerStub.withArgs(testCase.serviceArgsQuestion).returns({ count, rows: answers });
    answerStub.withArgs(testCase.serviceArgsNoNext).returns({ count, rows: answers });
    answerStub.returns({});
  });

  after('Removing stub', () => {
    sandbox.restore();
  });

  it('should return error if no answer is found', async () => {
    const response = await getAnswers({ ownerId: testCase.someOwnerId });

    expect(response).to.have.keys(['code', 'errorMessage', 'type']);
    expect(response.code).to.eql(404);
    expect(response.type).to.eql('RequestError');
  });

  it('should return error if questionId and ownerId is empty', async () => {
    const response = await getAnswers({});

    expect(response).to.have.keys(['code', 'errorMessage', 'type']);
    expect(response.code).to.eql(500);
  });

  it('should query using questionId when both questionId and ownerId is given', async () => {
    const response = await getAnswers(testCase.validQuestionParams);

    const { start, limit } = testCase.validQuestionParams;
    expect(response).to.have.keys(['count', 'next', 'previous', 'answers']);
    expect(response.count).to.eql(count.length);
    expect(response.previous).to.eql({ start, limit });
    expect(response.next).to.eql({ start: start + limit, limit });
    expect(response.answers).to.have.lengthOf(answers.length);
  });

  it('should query using ownerId if no questionId is given', async () => {
    const response = await getAnswers(testCase.validOwnerParams);

    const { start, limit } = testCase.validOwnerParams;
    expect(response).to.have.keys(['count', 'next', 'previous', 'answers']);
    expect(response.count).to.eql(count.length);
    expect(response.previous).to.eql({ start, limit });
    expect(response.next).to.eql({ start: start + limit, limit });
    expect(response.answers).to.have.lengthOf(1);
  });

  it('should return no next page info if on last page', async () => {
    const response = await getAnswers(testCase.validNoNextParams);

    const { start, limit } = testCase.validNoNextParams;
    expect(response).to.have.keys(['count', 'previous', 'answers']);
    expect(response.next).to.eql(undefined);
    expect(response.previous).to.eql({ start, limit });
  });
});
