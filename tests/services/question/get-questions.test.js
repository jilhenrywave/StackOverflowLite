/* eslint-disable no-undef */
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Question } = require('../../../db/model-handler');
const getPaginatedQuestions = require('../../../domains/question/services/get-questions');
const {
  getQuestionsWithSearch,
  questions,
  getQuestionsWithOwnerId,
  getQuestionsSortAnswers,
  getQuestionsSortOther,
  questionResponse,
} = require('../../test-cases/entities/question.entity');
const {
  getQuestionsValidIdArg,
  getQuestionsSearchArg,
  getQuestionsSortByAnswerArgs,
  getQuestionsSortOtherArgs,
  getQuestionsUserIdArg,
} = require('../../test-cases/services/question-service-tc');

describe('Get Questions Service', () => {
  const countSearch = [5, 5, 5, 5, 5];
  const countOwner = [3, 3, 3];
  const countAnswerSort = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const countOtherSort = [9, 9, 9, 9, 9, 9];

  before('Setting Stubs', () => {
    const getQuestionsStub = sandbox.stub(Question, 'findAndCountAll');

    getQuestionsStub
      .withArgs(getQuestionsWithSearch)
      .returns({ count: countSearch, rows: questions });

    getQuestionsStub
      .withArgs(getQuestionsWithOwnerId)
      .returns({ count: countOwner, rows: questions });

    getQuestionsStub
      .withArgs(getQuestionsSortAnswers)
      .returns({ count: countAnswerSort, rows: questions });

    getQuestionsStub
      .withArgs(getQuestionsSortOther)
      .returns({ count: countOtherSort, rows: questions });

    getQuestionsStub.returns({ count: [], rows: [] });
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should get questions when there is a valid Id', async () => {
    const response = await getPaginatedQuestions(getQuestionsValidIdArg);

    expect(response.totalCount).to.eql(countOwner.length);
    expect(response.questions[0]).to.eql(questionResponse);
  });

  it('should get questions when there is no id and there is a search', async () => {
    const response = await getPaginatedQuestions(getQuestionsSearchArg);

    expect(response.totalCount).to.eql(countSearch.length);
    expect(response.questions[0]).to.eql(questionResponse);
  });

  it('should get questions when sort is by answer count', async () => {
    const response = await getPaginatedQuestions(getQuestionsSortByAnswerArgs);

    expect(response.totalCount).to.eql(countAnswerSort.length);
    expect(response.questions[0]).to.eql(questionResponse);
  });

  it('should get questions when sort is not by answer count', async () => {
    const response = await getPaginatedQuestions(getQuestionsSortOtherArgs);

    expect(response.totalCount).to.eql(countOtherSort.length);
    expect(response.questions[0]).to.eql(questionResponse);
  });

  it('should throw 404 if user has no questions', async () => {
    const response = await getPaginatedQuestions(getQuestionsUserIdArg);

    expect(response.code).to.eql(404);
  });
});
