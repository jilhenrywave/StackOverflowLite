const { question } = require('./question-test-entity');
const { user } = require('./user-test-entity');

const id = '6d3900fe-edf0-468e-a962-1e9f8c0aca87';
const body = 'some-answer';
const votes = 0;
const ownerId = user.id;
const questionId = question.id;

const answerModel = { id, body, votes, ownerId, questionId };
const responseObject = { id, body, votes, questionId, user: { id: user.id, name: user.name } };

const answers = [
  answerModel,
  answerModel,
  answerModel,
];

module.exports = { answerModel, responseObject, user, answers };
