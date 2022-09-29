const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const { Answer, Vote } = require('../../../db/model-handler');
const sequelize = require('../../../db/sequelize');
const voteAnswer = require('../../../domains/answer/services/vote-answer');
const {
  registerVoteArgs,
  voteResponseDown,
  transaction,
  deleteVoteArgs,
} = require('../../test-cases/entities/answer.entity');
const {
  voteAnswerDuplicateVotesArgs,
  voteAnswerInvalidId,
  voteAnswerInvalidUser,
  voteAnswerValid,
  voteAnswerRemoveError,
  voteAnswerRemove,
} = require('../../test-cases/services/answer-service-tc');
const { answerId, id } = require('../../test-cases/test-constants');

/* eslint-disable no-undef */
describe('Vote Answer Service', () => {
  before('Setting Stubs', () => {
    const error = new Error();
    error.name = 'SequelizeForeignKeyConstraintError';
    sandbox.stub(sequelize, 'transaction').returns(transaction);
    const incrementStub = sandbox.stub(Answer, 'increment');
    const createVoteStub = sandbox.stub(Vote, 'create');
    const findVoteStub = sandbox.stub(Vote, 'findOne');
    const updateVoteStub = sandbox.stub(Vote, 'update');
    const destroyVoteStub = sandbox.stub(Vote, 'destroy');

    incrementStub.returns([1]);
    createVoteStub.withArgs({ answerId, userId: id }).returns({});
    createVoteStub.throws(error);
    findVoteStub.withArgs(registerVoteArgs).returns(voteResponseDown);
    findVoteStub.returns(undefined);
    updateVoteStub.returns([1]);
    destroyVoteStub.withArgs(deleteVoteArgs).returns(1);
    destroyVoteStub.returns(0);
  });

  after('Removing Stubs', () => {
    sandbox.restore();
  });

  it('should return error if user votes twice', async () => {
    const response = await voteAnswer(voteAnswerDuplicateVotesArgs);

    expect(response.code).to.eql(403);
  });

  it('should return error if answer id is not valid', async () => {
    const response = await voteAnswer(voteAnswerInvalidId);

    expect(response.code).to.eql(400);
  });

  it('should return error if user is not recognized', async () => {
    const response = await voteAnswer(voteAnswerInvalidUser);

    expect(response.code).to.eql(400);
  });

  it('should register votes successfully', async () => {
    const response = await voteAnswer(voteAnswerValid);

    expect(response).to.eql({});
  });

  it('should return error if vote to be remove does not exist', async () => {
    const response = await voteAnswer(voteAnswerRemoveError);

    expect(response.code).to.eql(403);
  });

  it('should remove vote successfully', async () => {
    const response = await voteAnswer(voteAnswerRemove);

    expect(response).to.eql({});
  });
});
