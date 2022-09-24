const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../../../middlewares/auth');
const { userProfileFormatter } = require('../../../middlewares/user/user-req-formatters');
const { registerUserValidator, loginValidator, updateUserValidator } = require('../../../middlewares/user/user-req-validators');
const { responseHandler } = require('../../../util/request-handler');

const router = express.Router();

router.post(
  '/',
  registerUserValidator,
  userProfileFormatter,
  (req, res) => {
    responseHandler(req.formattedBody, res, controller.registerUser);
  },
);

router.post(
  '/login',
  loginValidator,
  (req, res) => {
    responseHandler(req.body, res, controller.loginUser);
  },
);

router.post(
  '/logout',
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.logoutUser);
  },
);

router.post(
  '/logout/all',
  auth,
  (req, res) => {
    req.user.all = true;
    responseHandler(req.user, res, controller.logoutUser);
  },
);

router.get(
  '/me',
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.getThisUser);
  },
);

router.get(
  '/',
  auth,
  (req, res) => {
    responseHandler(req.query.id, res, controller.getUser);
  },
);

router.patch(
  '/me/edit',
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
  auth,
  (req, res) => {
    responseHandler(req.user, res, controller.deleteUser);
  },
);

module.exports = router;
