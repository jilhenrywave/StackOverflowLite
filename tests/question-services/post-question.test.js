/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const Question = require('../../question/models/Question');
const postQuestion = require('../../question/services/post-question');
const { questionEntry, question, questionResponse, user } = require('../entities/question-test-entity');

describe('Post Question Service', () => {
  before('Setting up stubs', () => {
    const questionStub = sandbox.stub(Question, 'create');

    questionStub.withArgs(questionEntry).returns(question);
    questionStub.returns({});
  });

  after('Removing stub', () => {
    sandbox.restore();
  });

  context('Valid Entry', () => {
    it('should return question object on save to the database', async () => {
      const { title, body } = questionEntry;
      const response = await postQuestion({ title, body, user });

      expect(response).to.have.keys(['id', 'title', 'body', 'owner']);
      expect(response).to.eql(questionResponse);
    });
  });

  context('Invalid Entry', () => {
    it('should return error if required parameters are missing', async () => {
      const { title } = questionEntry;
      const response = await postQuestion({ title, user });

      expect(response).to.have.keys(['code', 'type', 'errorMessage']);
      expect(response.code).to.eql(500);
    });
  });
});
