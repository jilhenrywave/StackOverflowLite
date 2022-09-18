const postQuestionValidator = require('../../question/validators/post-question.validator');
const { validationHandler } = require('../../util/request-handler');

exports.postQuestionValidator = (req, res, next) => {
  validationHandler(req, res, next, postQuestionValidator);
};
