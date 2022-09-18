/* eslint-disable object-curly-newline */
const { user } = require('./user-test-entity');

const id = 'ac9c4590-ce71-416f-99bd-687d7060d437';
const title = 'some-title';
const body = 'some-body';
const answerId = 'g1107d9c-d3f3-4c91-90b7-f0299f56e941';

exports.user = user;
exports.questionEntry = { title, body, ownerId: user.id };
exports.question = { id, title, body, ownerId: user.id, answerId };
exports.questionResponse = { id, title, body, owner: { id: user.id, name: user.name } };
