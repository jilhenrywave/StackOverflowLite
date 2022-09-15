const bcrypt = require('bcrypt');
const { ServerError } = require('../util/error-handlers');

exports.registerUserFormatter = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!hashedPassword) throw new Error();

    req.body = { name, email, password: hashedPassword };

    next();
  } catch (e) {
    const error = new ServerError(500, 'Unable to complete requests at this time, please try again later.');
    res.status(500).send({ ...error });
  }
};
