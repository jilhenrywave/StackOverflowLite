const User = require('../../domains/user/models/User');
const { user } = require('../entities/user-test-entity');

const invalidID = {
  ownerId: 'some-id',
  sort: 'desc',
  limit: '2',
  start: '4',
};

const invalidSort = {
  ownerId: user.id,
  sort: 'asca',
  limit: '2',
  start: '4',
};

const invalidLimit = {
  ownerId: user.id,
  sort: 'desc',
  limit: 'limit',
  start: '4',
};

const invalidStart = {
  ownerId: user.id,
  sort: 'asc',
  limit: '2',
  start: 'start',
};

const validID = {
  sort: 'desc',
  limit: '2',
  start: '4',
};

const validSort = {
  ownerId: user.id,
  start: '4',
};

const validLimit = {
  ownerId: user.id,
  sort: 'asc',
  start: '4',
};

const validStart = {
  sort: 'desc',
  limit: '2',
};
const validEntry = {
  ownerId: user.id,
  sort: 'asc',
  limit: 3,
  start: 3,
};

exports.validEntry = validEntry;
exports.invalidEntries = {
  invalidID,
  invalidLimit,
  invalidSort,
  invalidStart,
};

exports.validEntries = {
  validID,
  validLimit,
  validSort,
  validStart,
};

exports.serviceArgsEOP = {
  where: { ownerId: validEntry.ownerId },
  attributes: ['id', 'title', 'body'],
  include: {
    model: User,
    as: 'owner',
    required: true,
    attributes: ['id', 'name'],
  },
  order: [['title', validEntry.sort]],
  offset: validEntry.start,
  limit: validEntry.limit,
};
exports.serviceArgs = {
  where: { ownerId: validEntry.ownerId },
  attributes: ['id', 'title', 'body'],
  include: {
    model: User,
    as: 'owner',
    required: true,
    attributes: ['id', 'name'],
  },
  order: [['title', validEntry.sort]],
  offset: 7,
  limit: validEntry.limit,
};
