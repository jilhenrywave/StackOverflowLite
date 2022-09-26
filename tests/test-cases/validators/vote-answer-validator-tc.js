const { VOTE_TYPE } = require('../../../util/constants');
const { id } = require('../test-constants');

const missingVoteType = { id };
const missingId = { voteType: VOTE_TYPE.up };
const invalidVoteType = { id, voteType: 'some-vote-type' };
const invalidId = { id: 'some-id', voteType: VOTE_TYPE.down };

const validArgument = { id, voteType: VOTE_TYPE.up };

exports.invalidArguments = { missingVoteType, missingId, invalidVoteType, invalidId };
exports.validArguments = validArgument;
