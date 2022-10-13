const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../../../middlewares/auth');
const { userProfileFormatter } = require('../../../middlewares/user/user-req-formatters');
const { registerUserValidator, loginValidator, updateUserValidator } = require('../../../middlewares/user/user-req-validators');
const { responseHandler } = require('../../../util/request-handler');
const { postRequestLimiter, getRequestLimiter, updateDeleteUserRequestLimiter } = require('../../../util/rate-limiter');

const router = express.Router();

router.post(
  '/',
  postRequestLimiter,
  registerUserValidator,
  userProfileFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.registerUser);
  },
);

router.post(
  '/login',
  postRequestLimiter,
  loginValidator,
  (req, res) => {
    responseHandler(req.body, res, controller.loginUser);
  },
);

router.post(
  '/logout',
  postRequestLimiter,
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.logoutUser);
  },
);

router.post(
  '/logout/all',
  postRequestLimiter,
  auth,
  (req, res) => {
    req.user.all = true;
    responseHandler(req.user, res, controller.logoutUser);
  },
);

router.get(
  '/me',
  getRequestLimiter,
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.getThisUser);
  },
);

router.get(
  '/',
  getRequestLimiter,
  auth,
  (req, res) => {
    responseHandler(req.query.id, res, controller.getUser);
  },
);

router.patch(
  '/me/edit',
  updateDeleteUserRequestLimiter,
  auth,
  updateUserValidator,
  userProfileFormatter,
  (req, res) => {
    req.formattedBody = { id: req.user.id, update: req.formattedBody };
    responseHandler(req.formattedBody, res, controller.updateUser);
  },
);

router.delete(
  '/me',
  updateDeleteUserRequestLimiter,
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.deleteUser);
  },
);

module.exports = router;
