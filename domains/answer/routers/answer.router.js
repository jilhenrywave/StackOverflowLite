const express = require('express');
const validator = require('../../../middlewares/answer/answer-req-validators');
const formatter = require('../../../middlewares/answer/answer-req-formatter');
const auth = require('../../../middlewares/auth');
const { responseHandler } = require('../../../util/request-handler');
const controller = require('../controller/answer.controller');

const router = express.Router();

router.get(
  '/me',
  auth,
  validator.getUserAnswersValidator,
  formatter.getUserAnswersFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getAnswers);
  },
);

router.post(
  '/:id/accept',
  auth,
  validator.idParamValidator,
  formatter.idParamAuthUserFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.acceptAnswer);
  },
);

router.post(
  '/:id/reject',
  auth,
  validator.idParamValidator,
  formatter.idParamAuthUserFormatter,
  (req, res) => {
    req.formattedBody.reject = true;
    responseHandler(req.formattedBody, res, controller.acceptAnswer);
  },
);

router.post(
  '/:id/vote',
  auth,
  validator.voteAnswerValidator,
  formatter.voteAnswerFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.voteAnswer);
  },
);

router.post(
  '/:id/vote/cancel',
  auth,
  validator.voteAnswerValidator,
  formatter.voteAnswerFormatter,
  (req, res) => {
    req.formattedBody.remove = true;
    responseHandler(req.formattedBody, res, controller.voteAnswer);
  },
);

router.patch(
  '/:id/edit',
  auth,
  validator.postAnswerValidator,
  formatter.postAnswerFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.updateAnswer);
  },
);

router.delete(
  '/:id',
  auth,
  validator.idParamValidator,
  formatter.idParamAuthUserFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.deleteAnswer);
  },
);

router.post(
  '/:id/comments',
  auth,
  validator.postCommentValidator,
  formatter.postCommentFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.postComment);
  },
);

router.get(
  '/:id/comments',
  auth,
  validator.getCommentsValidator,
  formatter.getCommentsFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getComments);
  },
);
module.exports = router;
