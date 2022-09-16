const registerUserService = require('./user-services/register-user');
const loginUserService = require('./user-services/login-user');
const logoutUserService = require('./user-services/logout-user');

const userServiceHandler = async (payload, service, successCode) => {
  const serviceResponse = await service(payload);
  return { statusCode: serviceResponse.code || successCode, body: { ...serviceResponse } };
};

const registerUser = async (payload) => userServiceHandler(payload, registerUserService, 201);

const loginUser = async (payload) => userServiceHandler(payload, loginUserService, 200);

const logoutUser = async (payload) => userServiceHandler(payload, logoutUserService, 200);

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
