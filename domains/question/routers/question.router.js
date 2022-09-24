const express = require('express');
const auth = require('../../../middlewares/auth');
const controller = require('../controllers/question.controller');
const formatter = require('../../../middlewares/question/question-req-formatter');
const validator = require('../../../middlewares/question/question-req-validators');
const { responseHandler } = require('../../../util/request-handler');

const router = express.Router();

router.post(
  '/',
  auth,
  validator.postQuestionValidator,
  formatter.postQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.postQuestion);
  },
);

router.get(
  '/',
  auth,
  validator.getQuestionsValidator,
  formatter.getQuestionsFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getQuestions);
  },
);

router.get(
  '/me',
  auth,
  validator.getQuestionsValidator,
  formatter.getUserQuestionsFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getQuestions);
  },
);

router.get(
  '/:id',
  auth,
  validator.idParamValidator,
  (req, res) => {
    responseHandler(req.params.id, res, controller.getQuestion);
  },
);

router.patch(
  '/:id/edit',
  auth,
  validator.updateQuestionValidator,
  formatter.postQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.updateQuestion);
  },
);

router.delete(
  '/:id',
  auth,
  validator.idParamValidator,
  formatter.idParamAuthUserFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.deleteQuestion);
  },
);

router.delete(
  '/delete/all',
  auth,
  formatter.idParamAuthUserFormatter,
  (req, res) => {
    req.formattedBody.all = true;
    responseHandler(req.formattedBody, res, controller.deleteQuestion);
  },
);

router.post(
  '/:id/answers',
  auth,
  validator.postAnswerValidator,
  formatter.postAnswerFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.postAnswer);
  },
);

router.get(
  '/:id/answers',
  auth,
  validator.getQuestionAnswersValidator,
  formatter.getQuestionAnswersFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getAnswers);
  },
);

module.exports = router;
