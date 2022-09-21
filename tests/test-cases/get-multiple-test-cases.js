const QueryBuilder = require('../../db/query-helper/QueryBuilder');
const User = require('../../domains/user/models/User');
const { user } = require('../entities/user-test-entity');

const invalidID = {
  id: 'some-id',
  sort: 'desc',
  limit: '2',
  start: '4',
};

const invalidSort = {
  id: user.id,
  sort: 'asca',
  limit: '2',
  start: '4',
};

const invalidLimit = {
  id: user.id,
  sort: 'desc',
  limit: 'limit',
  start: '4',
};

const invalidStart = {
  id: user.id,
  sort: 'asc',
  limit: '2',
  start: 'start',
  search: 'man',
};

const invalidSearch = {
  id: user.id,
  sort: 'asc',
  limit: '2',
  start: 'start',
  search: '',
};

const validID = {
  sort: 'desc',
  limit: '2',
  start: '4',
};

const validSort = {
  id: user.id,
  start: '4',
};

const validLimit = {
  id: user.id,
  sort: 'asc',
  start: '4',
};

const validStart = {
  sort: 'desc',
  limit: '2',
};

const validSearch = {
  sort: 'desc',
  limit: '2',
  search: 'title',
};
const validEntry = {
  id: user.id,
  sort: 'asc',
  limit: 3,
  start: 3,
  search: 'some-search',
};

const serviceArgs = (offset) => new QueryBuilder()
  .setWhere({ ownerId: validEntry.id })
  .setAttributes(['id', 'title', 'body'])
  .setInclude([{
    model: User,
    as: 'owner',
    required: true,
    attributes: ['id', 'name'],
  },
  ])
  .setRaw(true)
  .setNest(true)
  .setOffset(offset)
  .setLimit(validEntry.limit)
  .setGroup('Question.id')
  .setSubQuery(false)
  .setOrder(['title', validEntry.sort])
  .build()
  .options;

exports.validEntry = validEntry;

exports.invalidEntries = {
  invalidID,
  invalidLimit,
  invalidSort,
  invalidStart,
  invalidSearch,
};

exports.validEntries = {
  validID,
  validLimit,
  validSort,
  validStart,
  validSearch,
};

exports.serviceArgsEOP = serviceArgs(validEntry.start);

exports.serviceArgs = serviceArgs(7);

exports.getQuestionServiceArgs = {
  attributes: ['id', 'title', 'body'],
  include: {
    model: User,
    as: 'owner',
    required: true,
    attributes: ['id', 'name'],
  },
  raw: true,
  nest: true,
};
