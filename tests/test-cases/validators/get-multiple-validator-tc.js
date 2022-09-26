const { id, start, limit, sortTitle, sortAnswer, sortVote } = require('../test-constants');

const invalidId = { id: 'some-id', start, limit, sort: sortVote };
const invalidStart = { id, start: 'ab', limit, sort: sortAnswer };
const invalidLimit = { id, start, limit: 'limit3', sort: sortTitle };
const invalidSort = { id, start, limit, sort: 'some-sort' };

const validCase1 = { id, sort: sortTitle };
const validCase2 = { start, limit };

exports.invalidArguments = {
  invalidId,
  invalidStart,
  invalidLimit,
  invalidSort,
};

exports.validArguments = {
  validCase1,
  validCase2,
};
