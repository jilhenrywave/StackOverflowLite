const { id, answer } = require('../test-constants');

const missingAnswer = { paramId: id };
const missingParamId = { answer };
const invalidAnswer = { answer: '   ', paramId: id };
const invalidParamId = { answer, paramId: 'some-id' };

const validArgument = { answer, paramId: id };

exports.invalidArguments = { missingAnswer, missingParamId, invalidAnswer, invalidParamId };
exports.validArguments = validArgument;
