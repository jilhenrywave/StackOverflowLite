const express = require('express');
const controller = require('./user.controller');
const { registerUserFormatter } = require('../middlewares/req-formatters');
const { registerUserValidator } = require('../middlewares/req-validators');

const router = express.Router();

router.post(
  '/users',
  registerUserValidator,
  registerUserFormatter,
  async (req, res) => {
    const response = await controller.registerUser(req.body);
    res.status(response.statusCode).send(response.body);
  },
);

module.exports = router;
