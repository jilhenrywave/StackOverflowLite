const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../../middlewares/auth');
const { userProfileFormatter } = require('../../middlewares/req-formatters');
const { registerUserValidator, loginValidator, updateUserValidator } = require('../../middlewares/req-validators');

const router = express.Router();

const requestHandler = async (arg, res, handler) => {
  const response = await handler(arg);
  res.status(response.statusCode).send(response.body);
};

router.post(
  '/users',
  registerUserValidator,
  userProfileFormatter,
  (req, res) => {
    requestHandler(req.formattedBody, res, controller.registerUser);
  },
);

router.post(
  '/users/login',
  loginValidator,
  (req, res) => {
    requestHandler(req.body, res, controller.loginUser);
  },
);

router.post(
  '/users/logout',
  auth,
  (req, res) => {
    requestHandler(req.user, res, controller.logoutUser);
  },
);

router.post(
  '/users/logoutAll',
  auth,
  (req, res) => {
    req.user.all = true;
    requestHandler(req.user, res, controller.logoutUser);
  },
);

router.get(
  '/users/me',
  auth,
  (req, res) => {
    requestHandler(req.user, res, controller.getThisUser);
  },
);

router.get(
  '/users',
  auth,
  (req, res) => {
    requestHandler(req.query.id, res, controller.getUser);
  },
);

router.patch(
  '/users/me',
  auth,
  updateUserValidator,
  userProfileFormatter,
  (req, res) => {
    req.formattedBody = { id: req.user.id, update: req.formattedBody };
    requestHandler(req.formattedBody, res, controller.updateUser);
  },
);

router.delete(
  '/users/me',
  auth,
  (req, res) => {
    requestHandler(req.user, res, controller.deleteUser);
  },
);

module.exports = router;
