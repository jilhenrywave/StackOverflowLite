const { expect } = require('chai');
const bcrypt = require('bcrypt');
const sandbox = require('sinon').createSandbox();
const {
  user,
  multipleFormatterTC,
  postAnswerFormatterTC,
  voteAnswerFormatterTC,
  postCommentFormatterTC,
  postQuestionFormatterTC,
  question,
  userProfileFormatterTC,
} = require('../test-cases/formatters-tc');
const getMultipleFormatter = require('../../middlewares/get-multiple.formatter');
const postAnswerFormatter = require('../../formatters/answer/post-answer.formatter');
const voteAnswerFormatter = require('../../formatters/answer/vote-answer.formatter');
const postCommentFormatter = require('../../formatters/comment/post-comment.formatter');
const postQuestionFormatter = require('../../formatters/question/post-question.formatter');
const userProfileFormatter = require('../../formatters/user/user-profile.formatter');
const { password, hashedPassword } = require('../test-cases/test-constants');

/* eslint-disable no-undef */
describe('Formatters', () => {
  before('Setting up stubs', () => {
    const bcryptStub = sandbox.stub(bcrypt, 'hash');
    bcryptStub.withArgs(password, 12).returns(hashedPassword);
  });

  after('Removing stubs', () => {
    sandbox.restore();
  });

  context('Get Multiple Formatter', () => {
    it('should format fields well', () => {
      const response = getMultipleFormatter(multipleFormatterTC.input);

      expect(response).to.eql(multipleFormatterTC.output);
    });
  });

  context('Post Answer Formatter', () => {
    it('should format fields well', () => {
      const response = postAnswerFormatter(postAnswerFormatterTC.input, user);

      expect(response).to.eql(postAnswerFormatterTC.output);
    });
  });

  context('Vote Answer Formatter', () => {
    it('should format fields well', () => {
      const response = voteAnswerFormatter(voteAnswerFormatterTC.input);

      expect(response).to.eql(voteAnswerFormatterTC.output);
    });
  });

  context('Post Comment Formatter', () => {
    it('should format fields well', () => {
      const response = postCommentFormatter(postCommentFormatterTC.input, user);

      expect(response).to.eql(postCommentFormatterTC.output);
    });
  });

  context('Post Question Formatter', () => {
    it('should format fields well', () => {
      const response = postQuestionFormatter(question, user);

      expect(response).to.eql(postQuestionFormatterTC.output);
    });
  });

  context('User Profile Formatter', () => {
    it('should format fields well', async () => {
      const response = await userProfileFormatter(userProfileFormatterTC.input);

      expect(response).to.eql(userProfileFormatterTC.output);
    });
  });
});
