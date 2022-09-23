/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { Question } = require('../../../db/model-handler');
const { questionResponse } = require('../../entities/question-test-entity');
const { updateStubArgValues, updateStubArgOptions, validEntry, invalidEntries } = require('../../test-cases/update-question-test-cases');
const { user } = require('../../entities/user-test-entity');
const updateQuestion = require('../../../domains/question/services/update-question');

describe('Update Question Service', () => {
  before('Setting up stubs', () => {
    const questionStub = sandbox.stub(Question, 'update');
    const getQuestionStub = sandbox.stub(Question, 'findByPk');

    questionStub.withArgs(updateStubArgValues, updateStubArgOptions).returns(questionResponse);
    questionStub.returns([0]);

    getQuestionStub.returns(questionResponse);
  });

  after('Removing stub', () => {
    sandbox.restore();
  });

  context('Invalid Entries', () => {
    it('should return error if question is not owned by user', async () => {
      const someOtherUser = { ...user, id: 'wrong-id' };
      const response = await updateQuestion({ ...validEntry, user: someOtherUser });

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(422);
    });

    it('should return error if question id does not exist', async () => {
      const response = await updateQuestion({ ...invalidEntries.invalidId, user });

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(422);
    });
  });

  context('Valid Entries', () => {
    it('should return response object if request is valid', async () => {
      const response = await updateQuestion({ ...validEntry, user });

      expect(response).to.eql(questionResponse);
    });
  });
});
