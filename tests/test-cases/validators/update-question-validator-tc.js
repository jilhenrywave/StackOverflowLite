const { id, title, body } = require('../test-constants');

const missingId = { title, body };
const missingTitleAndBody = { id };
const invalidId = { id: 'some-id', title };
const invalidTitle = { id, title: '   ', body };
const invalidBody = { id, title, body: '    ' };

const validArgument = { id, title, body };

exports.invalidArguments = {
  missingId,
  missingTitleAndBody,
  invalidId,
  invalidTitle,
  invalidBody,
};
exports.validArguments = validArgument;
