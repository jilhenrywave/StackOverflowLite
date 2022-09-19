const express = require('express');
const auth = require('../../../middlewares/auth');
const { responseHandler } = require('../../../util/request-handler');
const { postQuestionValidator, getQuestionValidator } = require('../../../middlewares/question/question-req-validators');
const { questionFormatter, getQuestionFormatter } = require('../../../middlewares/question/question-req-formatter');
const controller = require('../controllers/question.controller');

const router = express.Router();

router.post(
  '/questions',
  auth,
  postQuestionValidator,
  questionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.postQuestion);
  },
);

router.get(
  '/questions',
  auth,
  getQuestionValidator,
  getQuestionFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.getQuestion);
  },
);

module.exports = router;
