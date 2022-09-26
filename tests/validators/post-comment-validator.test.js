/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const { invalidArguments, validArguments } = require('../test-cases/validators/post-comment-validator-tc');
const postCommentValidator = require('../../validators/comment/post-comment.validator');

describe('Post Comment Validator', () => {
  context('Invalid Arguments', () => {
    Object.entries(invalidArguments).forEach(([key, value]) => {
      it(`should return error if there is ${key}`, () => {
        const response = postCommentValidator(value);

        expect(response).to.have.keys(['code', 'type', 'errorMessages', 'errorMessage']);
        expect(response.errorMessages).to.have.lengthOf(1);
        expect(response.code).to.eql(400);
        expect(response.type).to.eql('ValidationError');
      });
    });
  });

  context('Valid Argument', () => {
    it('should return zero error messages if arguments are valid', () => {
      const response = postCommentValidator(validArguments);

      expect(response.errorMessages).to.be.empty;
    });
  });
});
