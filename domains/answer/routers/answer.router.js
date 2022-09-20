const express = require('express');
const { postAnswerValidator } = require('../../../middlewares/answer/answer-req-validators');
const { postAnswerFormatter } = require('../../../middlewares/answer/answer.req-formatter');
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

module.exports = router;
