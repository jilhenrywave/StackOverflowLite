const express = require('express');
const auth = require('../../../middlewares/auth');
const { responseHandler } = require('../../../util/request-handler');
const controller = require('../controllers/question.controller');
const {
  postQuestionFormatter,
  getQuestionsFormatter,
  getUserQuestionsFormatter,
  deleteQuestionFormatter,
} = require('../../../middlewares/question/question-req-formatter');

const {
  postQuestionValidator,
  getQuestionsValidator,
  getDelQuestionValidator,
  updateQuestionValidator,
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
  getDelQuestionValidator,
  (req, res) => {
    responseHandler(req.params.id, res, controller.getQuestion);
  },
);

router.patch(
  '/questions/:id/edit',
  auth,
  updateQuestionValidator,
  postQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.updateQuestion);
  },
);

router.delete(
  '/questions/:id',
  auth,
  getDelQuestionValidator,
  deleteQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.deleteQuestion);
  },
);

module.exports = router;
