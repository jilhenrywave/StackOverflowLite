const { SORT_TYPES } = require('../../util/constants');

// Id Fields
const id = 'ac9c4590-ce71-416f-99bd-687d7060d437';
const ownerId = 'bc9c4510-ce71-416g-99bd-687d7060d437';
const questionId = 'qq9c4510-ce71-416g-99bd-687d7160f437';
const answerId = 'kc9c4510-ce71-416g-99bd-687d7160f437';

// User Fields
const name = 'some-name';
const email = 'henry@jil.com';
const password = 'pass5766word';
const hashedPassword = '$2b$12$4ppInOwfW6YD5iqd0Z6bl.6X0m.7YBRrJOTK99kmkIpFXPoEhoQlq';

// Comment Field
const comment = 'some-comment';

// Answer Field
const answer = 'some-answer';

// Question Field
const title = 'some-title';
const body = 'some-body';

// Get Query Fields
const start = '2';
const limit = '3';
const search = 'some-search';
const sortTitle = SORT_TYPES[0];
const sortAnswer = SORT_TYPES[2];
const sortVote = SORT_TYPES[5];

module.exports = {
  id,
  ownerId,
  questionId,
  answerId,
  name,
  email,
  password,
  hashedPassword,
  answer,
  comment,
  title,
  body,
  start,
  limit,
  search,
  sortTitle,
  sortAnswer,
  sortVote,
};
