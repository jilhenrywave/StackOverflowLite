const { id, page, limit, sortTitle, sortAnswer, sortVote } = require('../test-constants');

const invalidId = { id: 'some-id', page, limit, sort: sortVote };
const invalidpage = { id, page: 'ab', limit, sort: sortAnswer };
const invalidLimit = { id, page, limit: 'limit3', sort: sortTitle };
const invalidSort = { id, page, limit, sort: 'some-sort' };

const validCase1 = { id, sort: sortTitle };
const validCase2 = { page, limit };

exports.invalidArguments = {
  invalidId,
  invalidpage,
  invalidLimit,
  invalidSort,
};

exports.validArguments = {
  validCase1,
  validCase2,
};
