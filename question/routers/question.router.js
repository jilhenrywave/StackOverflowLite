const express = require('express');
const auth = require('../../middlewares/auth');
const { responseHandler } = require('../../util/request-handler');
const { postQuestionValidator } = require('../../middlewares/question/question-req-validators');
const { questionFormatter } = require('../../middlewares/question/question-req-formatter');
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

module.exports = router;
