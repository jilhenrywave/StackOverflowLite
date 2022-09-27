/* eslint-disable no-undef */
const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const { Answer } = require('../../../db/model-handler');
const { createArgs, answerModel, answerResponse } = require('../../test-cases/entities/answer.entity');
const {
  missingBody,
  missingParamId,
  invalidParamId,
  invalidUser,
  validEntry,
} = require('../../test-cases/services/answer-service-tc');
const postAnswer = require('../../../domains/answer/services/post-answer');

describe('Post Answer Service', () => {
  before('Setting stubs', () => {
    const error = new Error();
    error.name = 'SequelizeForeignKeyConstraintError';

    const createAnswerStub = sandbox.stub(Answer, 'create');

    createAnswerStub.withArgs(createArgs).returns(answerModel);
    createAnswerStub.throws(error);
  });

  context('Invalid Entries', () => {
    it('should return error if answer body is missing', async () => {
      const response = await postAnswer(missingBody);

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(500);
    });

    it('should return error if paramId is missing', async () => {
      const response = await postAnswer(missingParamId);

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(500);
    });

    it('should return error if paramId is not recognized', async () => {
      const response = await postAnswer(invalidParamId);

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(400);
    });

    it('should return error if userId is not recognized', async () => {
      const response = await postAnswer(invalidUser);

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(400);
    });
  });

  context('Valid Entry', () => {
    it('should return answer object if all arguments are valid', async () => {
      const response = await postAnswer(validEntry);

      expect(response).to.eql(answerResponse);
    });
  });
});
