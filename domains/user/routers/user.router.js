const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../../../middlewares/auth');
const { userProfileFormatter } = require('../../../middlewares/user/user-req-formatters');
const { registerUserValidator, loginValidator, updateUserValidator } = require('../../../middlewares/user/user-req-validators');
const { responseHandler } = require('../../../util/request-handler');

const router = express.Router();

router.post(
  '/users',
  registerUserValidator,
  userProfileFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.registerUser);
  },
);

router.post(
  '/users/login',
  loginValidator,
  (req, res) => {
    responseHandler(req.body, res, controller.loginUser);
  },
);

router.post(
  '/users/logout',
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.logoutUser);
  },
);

router.post(
  '/users/logout/all',
  auth,
  (req, res) => {
    req.user.all = true;
    responseHandler(req.user, res, controller.logoutUser);
  },
);

router.get(
  '/users/me',
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.getThisUser);
  },
);

router.get(
  '/users',
  auth,
  (req, res) => {
    responseHandler(req.query.id, res, controller.getUser);
  },
);

router.patch(
  '/users/me/edit',
  auth,
  updateUserValidator,
  userProfileFormatter,
  (req, res) => {
    req.formattedBody = { id: req.user.id, update: req.formattedBody };
    responseHandler(req.formattedBody, res, controller.updateUser);
  },
);

router.delete(
  '/users/me',
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.deleteUser);
  },
);

module.exports = router;
