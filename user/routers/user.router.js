const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../../middlewares/auth');
const { registerUserFormatter } = require('../../middlewares/req-formatters');
const { registerUserValidator, loginValidator } = require('../../middlewares/req-validators');

const router = express.Router();

const requestHandler = async (arg, res, handler) => {
  const response = await handler(arg);
  res.status(response.statusCode).send(response.body);
};

router.post(
  '/users',
  registerUserValidator,
  registerUserFormatter,
  async (req, res) => {
    requestHandler(req.body, res, controller.registerUser);
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
    requestHandler(req.body, res, controller.logoutUser);
  },
);

router.post(
  '/users/logoutAll',
  auth,
  async (req, res) => {
    req.body.all = true;
    requestHandler(req.body, res, controller.logoutUser);
  },
);

router.get(
  '/users/me',
  auth,
  async (req, res) => {
    requestHandler(req.body, res, controller.getThisUser);
  },
);

router.get(
  '/users',
  auth,
  async (req, res) => {
    requestHandler(req.query.id, res, controller.getUser);
  },
);

module.exports = router;
