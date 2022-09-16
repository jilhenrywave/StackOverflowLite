const express = require('express');
const controller = require('./user.controller');
const { registerUserFormatter } = require('../middlewares/req-formatters');
const { registerUserValidator, loginValidator } = require('../middlewares/req-validators');

const router = express.Router();

const requestHandler = async (req, res, handler) => {
  const response = await handler(req.body);
  res.status(response.statusCode).send(response.body);
};

router.post(
  '/users',
  registerUserValidator,
  registerUserFormatter,
  async (req, res) => {
    requestHandler(req, res, controller.registerUser);
  },
);

router.post(
  '/users/login',
  loginValidator,
  async (req, res) => {
    requestHandler(req, res, controller.loginUser);
  },
);

module.exports = router;
