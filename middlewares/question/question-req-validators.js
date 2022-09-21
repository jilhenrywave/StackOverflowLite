const postQuestionValidator = require('../../domains/question/validators/post-question.validator');
const idParamValidator = require('../idParam.validator');
const updateQuestionValidator = require('../../domains/question/validators/update-question.validator');
const getMultipleValidator = require('../get-multiple.validator');
const { validationHandler } = require('../../util/request-handler');

exports.postQuestionValidator = (req, res, next) => {
  validationHandler(req.body, res, next, postQuestionValidator);
};

exports.getQuestionsValidator = (req, res, next) => {
  validationHandler({ ...req.query, id: req.query.ownerId }, res, next, getMultipleValidator);
};

exports.idParamValidator = idParamValidator;

exports.updateQuestionValidator = (req, res, next) => {
  const body = { id: req.params.id, title: req.body.title, body: req.body.body };
  validationHandler(body, res, next, updateQuestionValidator);
};
