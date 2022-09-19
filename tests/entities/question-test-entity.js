/* eslint-disable object-curly-newline */
const { user } = require('./user-test-entity');
const { validEntry } = require('../test-cases/get-questions-test-cases');

const id = 'ac9c4590-ce71-416f-99bd-687d7060d437';
const title = 'some-title';
const body = 'some-body';
const answerId = 'g1107d9c-d3f3-4c91-90b7-f0299f56e941';

const questionResponse = { id, title, body, owner: { id: user.id, name: user.name } };

const questions = [
  questionResponse,
  questionResponse,
  questionResponse,
  questionResponse,
  questionResponse,
];

exports.user = user;

exports.questionEntry = { title, body, ownerId: user.id };

exports.updateQuestionEntry = { id, title, body };

exports.question = { id, title, body, ownerId: user.id, answerId };

exports.questionResponse = questionResponse;

exports.questions = questions;

exports.getResponseWithNext = {
  previous: { start: validEntry.start, limit: validEntry.limit },
  next: { start: validEntry.start + validEntry.limit, limit: validEntry.limit },
  questions,
};

exports.getResponseWithoutNext = {
  previous: { start: validEntry.start, limit: validEntry.limit },
  questions,
};
