const express = require('express');
const validator = require('../../../middlewares/answer/answer-req-validators');
const formatter = require('../../../middlewares/answer/answer.req-formatter');
const auth = require('../../../middlewares/auth');
const { responseHandler } = require('../../../util/request-handler');
const controller = require('../controller/answer.controller');

const router = express.Router();

router.post(
  '/questions/:id/answers',
  auth,
  validator.postAnswerValidator,
  formatter.postAnswerFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.postAnswer);
  },
);

router.get(
  '/questions/:id/answers',
  auth,
  validator.getQuestionAnswersValidator,
  formatter.getQuestionAnswersFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getAnswers);
  },
);

router.get(
  '/answers',
  auth,
  validator.getUserAnswersValidator,
  formatter.getUserAnswersFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getAnswers);
  },
);

module.exports = router;
