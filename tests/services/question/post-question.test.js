/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Question } = require('../../../db/model-handler');
const postQuestion = require('../../../domains/question/services/post-question');
const {
  postQuestionValidArgs,
  postOptions,
  postQuestionInvalidOwnerArgs,
  questionModel,
  questionResponse,
} = require('../../test-cases/entities/question.entity');
const {
  postQuestionNoTitle,
  postQuestionNoBody,
  postQuestionNoUserId,
  postQuestionInvalidUserId,
  postQuestionValidArguments,
} = require('../../test-cases/services/question-service-tc');

describe('Post Question Service', () => {
  before('Setting Stubs', () => {
    const error = new Error();
    error.name = 'SequelizeForeignKeyConstraintError';
    const postStub = sandbox.stub(Question, 'create');

    postStub.withArgs(postQuestionValidArgs, postOptions).returns(questionModel);
    postStub.withArgs(postQuestionInvalidOwnerArgs, postOptions).throws(error);
    postStub.returns(null);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if there is no title', async () => {
    const response = await postQuestion(postQuestionNoTitle);

    expect(response.code).to.eql(500);
  });

  it('should return error if there is no body', async () => {
    const response = await postQuestion(postQuestionNoBody);

    expect(response.code).to.eql(500);
  });

  it('should return error if there is no user id', async () => {
    const response = await postQuestion(postQuestionNoUserId);

    expect(response.code).to.eql(500);
  });

  it('should return error if user id is not recognized', async () => {
    const response = await postQuestion(postQuestionInvalidUserId);

    expect(response.code).to.eql(400);
  });

  it('should return response object if arguments are valid', async () => {
    const response = await postQuestion(postQuestionValidArguments);

    expect(response).to.eql(questionResponse);
  });
});
