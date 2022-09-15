const registerUserService = require('./user-services/register-user');

const registerUser = async (payload) => {
  const serviceResponse = await registerUserService(payload);
  return { statusCode: serviceResponse.code || 201, body: { ...serviceResponse } };
};

module.exports = { registerUser };
