const { id, name, email, ownerId } = require('../test-constants');

const user = { id, name, email };
const owner = { id: ownerId, name, email };

module.exports = {
  user,
  owner,
};
