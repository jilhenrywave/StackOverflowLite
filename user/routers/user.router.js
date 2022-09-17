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
  async (req, res) => {
    requestHandler(req.formattedBody, res, controller.registerUser);
  },
);

router.post(
  '/users/login',
  loginValidator,
  async (req, res) => {
    requestHandler(req.body, res, controller.loginUser);
  },
);

router.post(
  '/users/logout',
  auth,
  async (req, res) => {
    requestHandler(req.user, res, controller.logoutUser);
  },
);

router.post(
  '/users/logoutAll',
  auth,
  async (req, res) => {
    req.user.all = true;
    requestHandler(req.user, res, controller.logoutUser);
  },
);

router.get(
  '/users/me',
  auth,
  async (req, res) => {
    requestHandler(req.user, res, controller.getThisUser);
  },
);

router.get(
  '/users',
  auth,
  async (req, res) => {
    requestHandler(req.query.id, res, controller.getUser);
  },
);

router.patch(
  '/users/me',
  auth,
  updateUserValidator,
  userProfileFormatter,
  async (req, res) => {
    req.formattedBody = { id: req.user.id, update: req.formattedBody };
    requestHandler(req.formattedBody, res, controller.updateUser);
  },
);

module.exports = router;
