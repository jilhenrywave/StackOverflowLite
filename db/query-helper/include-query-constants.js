const { Question, Answer, User, Token } = require('../model-handler');
const QueryBuilder = require('./QueryBuilder');
// const Vote = require('../models/Vote');

exports.includeUser = QueryBuilder.createIncludeObject(User, ['id', 'name'], 'owner');

exports.includeQuestion = QueryBuilder.createIncludeObject(Question, ['answerId'], 'question');

const answerCount = QueryBuilder.createFn('COUNT', 'answers.question_id', 'count');

exports.includeAnswer = QueryBuilder.createIncludeObject(Answer, [answerCount], 'answers');

exports.includeToken = QueryBuilder.createIncludeObject(Token, ['token'], 'tokens', true);

// const votesCol = QueryBuilder.createFn('count', 'votes.answer_id', 'votes');
// exports.includeVote = QueryBuilder.createIncludeObject(Vote, [votesCol], 'votes');
