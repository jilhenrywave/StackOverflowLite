/* eslint-disable max-len */
/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { validEntry, serviceArgs, serviceArgsEOP } = require('../../test-cases/get-multiple-test-cases');
const { questions } = require('../../entities/question-test-entity');
const Question = require('../../../domains/question/models/Question');
const getPaginatedQuestions = require('../../../domains/question/services/get-questions');

describe('Get Questions Service', () => {
  const count = 10;
  before('Setting up stubs', () => {
    const questionStub = sandbox.stub(Question, 'findAndCountAll');

    questionStub.withArgs(serviceArgs).returns({ count, rows: questions });
    questionStub.withArgs(serviceArgsEOP).returns({ count, rows: questions });
    questionStub.returns({});
  });

  after('Removing stub', () => {
    sandbox.restore();
  });

  it('should return error if no question is found', async () => {
    const response = await getPaginatedQuestions({});

    expect(response).to.have.keys(['code', 'errorMessage', 'type']);
    expect(response.code).to.eql(404);
    expect(response.type).to.eql('RequestError');
  });

  it('should return correct page info fields and questions', async () => {
    const response = await getPaginatedQuestions({ ...validEntry, ownerId: validEntry.id });

    const { start, limit } = validEntry;
    expect(response).to.have.keys(['count', 'next', 'previous', 'questions']);
    expect(response.previous).to.eql({ start, limit });
    expect(response.next).to.eql({ start: start + limit, limit });
    expect(response.questions[0]).to.eql(questions[0]);
  });

  it('should return no next page info if on last page', async () => {
    const response = await getPaginatedQuestions({ ...validEntry, ownerId: validEntry.id, start: 7 });

    const { limit } = validEntry;
    expect(response).to.have.keys(['count', 'previous', 'questions']);
    expect(response.next).to.eql(undefined);
    expect(response.previous).to.eql({ start: 7, limit });
    expect(response.questions[0]).to.eql(questions[0]);
  });
});
