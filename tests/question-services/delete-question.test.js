/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { question } = require('../entities/question-test-entity');
const Question = require('../../domains/question/models/Question');
const deleteQuestion = require('../../domains/question/services/delete-question');

describe('Delete Question Service', () => {
  before('Setting up stubs', () => {
    const questionStub = sandbox.stub(Question, 'destroy');

    questionStub.withArgs(
      { where: { id: question.id, ownerId: question.ownerId } },
    ).returns(1);
    questionStub.returns(0);
  });

  after('Removing stub', () => {
    sandbox.restore();
  });

  context('Invalid Queries', () => {
    it('should return error if question is not owned by user', async () => {
      const response = await deleteQuestion({ id: question.id, ownerId: 'some-other-id' });

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(422);
    });

    it('should return error if question id is not valid', async () => {
      const response = await deleteQuestion({ id: 'some-id', ownerId: question.ownerId });

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(422);
    });
  });

  context('Valid Queries', () => {
    it('should return nothing if question is owned by user', async () => {
      const response = await deleteQuestion({ id: question.id, ownerId: question.ownerId });

      expect(response).to.eql({});
    });
  });
});
