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

router.post(
  '/answers/:id/accept',
  auth,
  validator.idParamValidator,
  formatter.idParamAuthUserFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.acceptAnswer);
  },
);

router.post(
  '/answers/:id/reject',
  auth,
  validator.idParamValidator,
  formatter.idParamAuthUserFormatter,
  (req, res) => {
    req.formattedBody.reject = true;
    responseHandler(req.formattedBody, res, controller.acceptAnswer);
  },
);

router.post(
  '/answers/:id/vote',
  auth,
  validator.voteAnswerValidator,
  formatter.voteAnswerFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.voteAnswer);
  },
);

router.post(
  '/answers/:id/vote/cancel',
  auth,
  validator.voteAnswerValidator,
  formatter.voteAnswerFormatter,
  (req, res) => {
    req.formattedBody.remove = true;
    responseHandler(req.formattedBody, res, controller.voteAnswer);
  },
);

router.patch(
  '/answers/:id/edit',
  auth,
  validator.postAnswerValidator,
  formatter.postAnswerFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.updateAnswer);
  },
);

module.exports = router;
