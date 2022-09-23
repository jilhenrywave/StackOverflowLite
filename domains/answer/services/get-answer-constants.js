const { Question } = require('../../../db/model-handler');
const QueryBuilder = require('../../../db/query-helper/QueryBuilder');
const User = require('../../user/models/User');
// const Vote = require('../models/Vote');

exports.includeUser = QueryBuilder.createIncludeObject(User, ['id', 'name'], 'owner');
exports.includeQuestion = QueryBuilder.createIncludeObject(Question, ['answerId'], 'question');

// const votesCol = QueryBuilder.createFn('count', 'votes.answer_id', 'votes');
// exports.includeVote = QueryBuilder.createIncludeObject(Vote, [votesCol], 'votes');
