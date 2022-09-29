const { SORT_TYPES } = require('../../util/constants');

// Id Fields
const id = '78a52b96-fc04-43a0-bdd5-e127fcd451ce';
const ownerId = '79a52b96-fc04-43a0-bdd5-e127fcd451ce';
const questionId = '98a52b96-fc04-42a0-bdd5-e127fcd451ce';
const answerId = 'kc9c4510-ce71-416g-99bd-687d7160f437';
const commentId = 'zk9c4510-ce71-416g-99bd-687d7160f437';

// User Fields
const name = 'some-name';
const email = 'henry@jil.com';
const password = 'pass5766word';
const hashedPassword = '$2b$12$4ppInOwfW6YD5iqd0Z6bl.6X0m.7YBRrJOTK99kmkIpFXPoEhoQlq';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4YTUyYjk2LWZjMDQtNDNhMC1iZGQ1LWUxMjdmY2Q0NTFjZSIsImlhdCI6MTY2NDAyOTc5OSwiZXhwIjoxNjY1NzU3Nzk5fQ.mk8kmYlWByGbf8z5NaQ_xfGWp_BkDJyLSm_peLZcVm0';

// Comment Field
const comment = 'some-comment';

// Answer Field
const answer = 'some-answer';

// Question Field
const title = 'some-title';
const body = 'some-body';

// Get Query Fields
const page = '2';
const limit = '3';
const search = 'some-search';
const sortTitle = SORT_TYPES[0];
const sortAnswer = SORT_TYPES[2];
const sortVote = SORT_TYPES[5];

const link = 'http://myapp.com/';

module.exports = {
  id,
  ownerId,
  questionId,
  answerId,
  commentId,
  name,
  email,
  password,
  hashedPassword,
  token,
  answer,
  comment,
  title,
  body,
  page,
  limit,
  search,
  sortTitle,
  sortAnswer,
  sortVote,
  link,
};
