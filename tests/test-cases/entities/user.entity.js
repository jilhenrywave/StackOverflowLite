/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
const { User, Token } = require('../../../db/model-handler');
const { includeToken } = require('../../../db/query-helper/include-query-constants');
const { id, name, email, ownerId, token, hashedPassword } = require('../test-constants');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');

const user = { id, name, email };
const userWithToken = { user, token };
const userAndToken = { id, name, email, tokens: { token } };
const userWithPassword = { id, name, email, password: hashedPassword };
const owner = { id: ownerId, name, email };

const deleteUserOptions = new QueryBuilder().setModel(User).setWhere({ id }).build().options;

const getUserTokenOptions = new QueryBuilder()
  .setModel(User)
  .setAttributes(['id', 'name', 'email'])
  .setWhere({ token })
  .setInclude([includeToken])
  .setNest(true)
  .build().options;

const getUserOptions = new QueryBuilder()
  .setModel(User)
  .setAttributes(['id', 'name', 'email'])
  .build().options;

const findOneOptions = new QueryBuilder()
  .setModel(User)
  .setAttributes(['id', 'name', 'email', 'password'])
  .setWhere({ email })
  .build().options;

const removeTokenOptions = (where) =>
  new QueryBuilder().setModel(Token).setWhere(where).build().options;
const removeAllTokensOptions = removeTokenOptions({ userId: id });
const removeOneTokenptions = removeTokenOptions({ token });

const registerUserOptions = new QueryBuilder().setModel(User).build().options;
const registerUserValuesValid = { name, email, hashedPassword };
const registerUserDuplicateEmail = { name, email: 'duplicate-email', hashedPassword };

const updateUserOptions = new QueryBuilder().setModel(User).setWhere({ id }).build().options;
const updateUserValid = { email };
const updateUserDuplicateEmail = { email: 'duplicate-email' };

module.exports = {
  user,
  owner,
  userWithToken,
  userAndToken,
  userWithPassword,
  deleteUserOptions,
  getUserTokenOptions,
  getUserOptions,
  findOneOptions,
  removeAllTokensOptions,
  removeOneTokenptions,
  registerUserOptions,
  registerUserValuesValid,
  registerUserDuplicateEmail,
  updateUserOptions,
  updateUserDuplicateEmail,
  updateUserValid,
};
