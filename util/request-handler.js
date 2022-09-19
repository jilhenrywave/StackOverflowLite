const responseHandler = async (arg, res, handler) => {
  const response = await handler(arg);
  res.status(response.statusCode).send(response.body);
};

const formattedRequestHandler = (req, res, next, formattedBody) => {
  if (formattedBody.code) return res.status(formattedBody.code).send({ ...formattedBody });

  req.formattedBody = formattedBody;

  return next();
};

const validationHandler = (arg, res, next, validator) => {
  const validatorResponse = validator(arg);

  if (validatorResponse.errorMessages.length > 0) {
    validatorResponse.errorMessage = 'Invalid Request Body Fields';
    return res.status(validatorResponse.code).send({ ...validatorResponse });
  }

  return next();
};

module.exports = {
  responseHandler,
  validationHandler,
  formattedRequestHandler,
};
