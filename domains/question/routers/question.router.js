const express = require('express');
const auth = require('../../../middlewares/auth');
const { responseHandler } = require('../../../util/request-handler');
const controller = require('../controllers/question.controller');
const formatter = require('../../../middlewares/question/question-req-formatter');
const validator = require('../../../middlewares/question/question-req-validators');

const router = express.Router();

router.post(
  '/questions',
  auth,
  validator.postQuestionValidator,
  formatter.postQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.postQuestion);
  },
);

router.get(
  '/questions',
  auth,
  validator.getQuestionsValidator,
  formatter.getQuestionsFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getQuestions);
  },
);

router.get(
  '/questions/me',
  auth,
  validator.getQuestionsValidator,
  formatter.getUserQuestionsFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getQuestions);
  },
);

router.get(
  '/questions/:id',
  auth,
  validator.idParamValidator,
  (req, res) => {
    responseHandler(req.params.id, res, controller.getQuestion);
  },
);

router.patch(
  '/questions/:id/edit',
  auth,
  validator.updateQuestionValidator,
  formatter.postQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.updateQuestion);
  },
);

router.delete(
  '/questions/:id',
  auth,
  validator.idParamValidator,
  formatter.deleteQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.deleteQuestion);
  },
);

router.delete(
  '/questions/delete/all',
  auth,
  formatter.deleteQuestionFormatter,
  (req, res) => {
    req.formattedBody.all = true;
    responseHandler(req.formattedBody, res, controller.deleteQuestion);
  },
);

module.exports = router;
