const express = require('express');
const { responseHandler } = require('../../../util/request-handler');
const controller = require('../controllers/comment.controller');
const formatter = require('../../../middlewares/comment/comment-req-formatter');
const validator = require('../../../middlewares/comment/comment-req-validator');
const auth = require('../../../middlewares/auth');

const router = express.Router();

router.patch(
  '/:id',
  auth,
  validator.postCommentValidator,
  formatter.postCommentFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.updateComment);
  },
);

module.exports = router;
