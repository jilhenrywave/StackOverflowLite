const express = require('express');
const { postAnswerValidator, getQuestionAnswersValidator, getUserAnswersValidator } = require('../../../middlewares/answer/answer-req-validators');
const { postAnswerFormatter, getQuestionAnswersFormatter, getUserAnswersFormatter } = require('../../../middlewares/answer/answer.req-formatter');
const auth = require('../../../middlewares/auth');
const { responseHandler } = require('../../../util/request-handler');
const controller = require('../controller/answer.controller');

const router = express.Router();

router.post(
  '/questions/:id/answers',
  auth,
  postAnswerValidator,
  postAnswerFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.postAnswer);
  },
);

router.get(
  '/questions/:id/answers',
  auth,
  getQuestionAnswersValidator,
  getQuestionAnswersFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getAnswers);
  },
);

router.get(
  '/answers',
  auth,
  getUserAnswersValidator,
  getUserAnswersFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getAnswers);
  },
);

module.exports = router;
