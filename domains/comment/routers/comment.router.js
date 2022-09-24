const express = require('express');
const { responseHandler } = require('../../../util/request-handler');
const controller = require('../controllers/comment.controller');
const formatter = require('../../../middlewares/comment/comment-req-formatter');
const validator = require('../../../middlewares/comment/comment-req-validator');
const auth = require('../../../middlewares/auth');

const router = express.Router();

router.patch(
  '/:id/edit',
  auth,
  validator.postCommentValidator,
  formatter.postCommentFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.updateComment);
  },
);

router.delete(
  '/:id',
  auth,
  validator.idParamValidator,
  formatter.idParamAuthUserFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.deleteComment);
  },
);

module.exports = router;
