const postAnswerValidator = require('../../domains/answer/validators/post-question.validator');
const { validationHandler } = require('../../util/request-handler');

exports.postAnswerValidator = (req, res, next) => {
  const request = { answer: req.body.answer, questionId: req.params.id };

  validationHandler(request, res, next, postAnswerValidator);
};
