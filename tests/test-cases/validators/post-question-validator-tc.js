const { title, body } = require('../test-constants');

const missingTitle = { body };
const missingBody = { title };
const invalidTitle = { title: '   ', body };
const invalidBody = { title, body: '    ' };

const validArgument = { title, body };

exports.invalidArguments = {
  missingTitle,
  missingBody,
  invalidTitle,
  invalidBody,
};
exports.validArguments = validArgument;
