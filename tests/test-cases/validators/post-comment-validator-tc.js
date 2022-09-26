const { id, comment } = require('../test-constants');

const missingComment = { paramId: id };
const missingParamId = { comment };
const invalidComment = { paramId: id, comment: '   ' };
const invalidParamId = { iparamId: 'some-id', comment };

const validArgument = { paramId: id, comment };

exports.invalidArguments = {
  missingComment,
  missingParamId,
  invalidComment,
  invalidParamId,
};
exports.validArguments = validArgument;
