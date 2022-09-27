/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Answer } = require('../../../db/model-handler');
const getAnswers = require('../../../domains/answer/services/get-answers');
const {
  findAllQuestionIdArgs,
  findAllOwnerIdArgs,
  answerResponse,
  answerResponses,
} = require('../../test-cases/entities/answer.entity');
const {
  getAnswerMissingParams,
  getAnswerByQuestionId,
  getAnswerByOwnerId,
} = require('../../test-cases/services/answer-service-tc');

describe('Get Answers Service', () => {
  before('SSetting up Stubs', () => {
    const findAllAnswerStub = sandbox.stub(Answer, 'findAndCountAll');

    findAllAnswerStub
      .withArgs(findAllQuestionIdArgs)
      .returns({ count: answerResponses.length, rows: answerResponses });

    findAllAnswerStub.withArgs(findAllOwnerIdArgs).returns({ count: 1, rows: [answerResponse] });
    findAllAnswerStub.returns({ count: 0, rows: [] });
  });

  after('Removing stubs', () => {
    sandbox.restore();
  });

  it('should error if questionId and ownerId is missing', async () => {
    const response = await getAnswers(getAnswerMissingParams);

    expect(response).to.have.keys(['type', 'code', 'errorMessage']);
    expect(response.code).to.eql(500);
  });

  it('should get answers by questionId if present', async () => {
    const response = await getAnswers(getAnswerByQuestionId);

    expect(response).to.have.keys(['totalCount', 'previous', 'next', 'answers']);
    expect(response.totalCount).to.eql(answerResponses.length);
    expect(response.answers).to.have.lengthOf(answerResponses.length);
  });

  it('should get answers by ownerId if questionId is not present', async () => {
    const response = await getAnswers(getAnswerByOwnerId);

    expect(response).to.have.keys(['totalCount', 'previous', 'next', 'answers']);
    expect(response.totalCount).to.eql(1);
    expect(response.answers).to.have.lengthOf(1);
  });

  it('should return error if query id is not recognized', async () => {
    const response = await getAnswers({ questionId: 'some-question-id' });

    expect(response).to.have.keys(['type', 'code', 'errorMessage']);
    expect(response.code).to.eql(404);
  });
});
