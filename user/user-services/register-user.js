const User = require('../User');
const registerToken = require('../token-services/register-token');
const { AppError, RequestBodyError, ServerError } = require('../../util/error-handlers');

//const isEntryValid = (userEntry) => userEntry.name && userEntry.email && userEntry.password;

const getToken = async (userId) => registerToken(userId);

const createUser = async (userEntry) => {
  const user = User.build(userEntry);
  if (!user) throw new ServerError(500, 'Error: Could not create user');
  await user.save();
  return user;
};

const registerUser = async (userEntry) => {
  try {
    // if (!isEntryValid(userEntry)) {
    //   throw new RequestBodyError(400, 'Required fields are missing. Ensure name, email and password are provided');
    // }

    const user = await createUser(userEntry);

    const token = await getToken(user.id);

    return ({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (e) {
    if (e instanceof AppError) {
      return e;
    }
    if (e.name === 'SequelizeUniqueConstraintError') {
      return new RequestBodyError(409, 'Email already exists');
    }
    return new ServerError(500, e.message);
  }
};

module.exports = registerUser;
