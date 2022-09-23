const { Question, Answer } = require('../model-handler');
const QueryBuilder = require('./QueryBuilder');
const User = require('../../domains/user/models/User');
// const Vote = require('../models/Vote');

exports.includeUser = QueryBuilder.createIncludeObject(User, ['id', 'name'], 'owner');

exports.includeQuestion = QueryBuilder.createIncludeObject(Question, ['answerId'], 'question');

const answerCount = QueryBuilder.createFn('COUNT', 'answers.question_id', 'ans_count');

exports.includeAnswer = QueryBuilder.createIncludeObject(Answer, [answerCount], 'answers');

// const votesCol = QueryBuilder.createFn('count', 'votes.answer_id', 'votes');
// exports.includeVote = QueryBuilder.createIncludeObject(Vote, [votesCol], 'votes');
