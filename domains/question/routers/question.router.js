const express = require('express');
const auth = require('../../../middlewares/auth');
const { responseHandler } = require('../../../util/request-handler');
const controller = require('../controllers/question.controller');
const {
  postQuestionFormatter,
  getQuestionsFormatter,
  getUserQuestionsFormatter,
} = require('../../../middlewares/question/question-req-formatter');

const {
  postQuestionValidator,
  getQuestionsValidator,
  getQuestionValidator,
} = require('../../../middlewares/question/question-req-validators');

const router = express.Router();

router.post(
  '/questions',
  auth,
  postQuestionValidator,
  postQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.postQuestion);
  },
);

router.get(
  '/questions',
  auth,
  getQuestionsValidator,
  getQuestionsFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getQuestions);
  },
);

router.get(
  '/questions/me',
  auth,
  getQuestionsValidator,
  getUserQuestionsFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getQuestions);
  },
);

router.get(
  '/questions/:id',
  auth,
  getQuestionValidator,
  (req, res) => {
    responseHandler(req.params.id, res, controller.getQuestion);
  },
);

module.exports = router;
