const serviceResponseHandler = async (payload, service, successCode) => {
  const serviceResponse = await service(payload);
  return { statusCode: serviceResponse.code || successCode, body: { ...serviceResponse } };
};

module.exports = serviceResponseHandler;
