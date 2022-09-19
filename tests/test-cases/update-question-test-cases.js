const { updateQuestionEntry, user } = require('../entities/question-test-entity');

const invalidId = {
  id: 'some-id',
  title: 'title',
  body: 'body',
};
const invalidId2 = {
  title: 'title',
  body: 'body',
};
const invalidTitle = {
  id: updateQuestionEntry.id,
  title: ' ',
  body: 'body',
};
const invalidBody = {
  id: updateQuestionEntry.id,
  title: 'title',
  body: '  ',
};

const validEntry = { id: updateQuestionEntry.id, title: 'title', body: 'body' };

exports.invalidEntries = { invalidId, invalidId2, invalidTitle, invalidBody };

exports.validEntry = validEntry;

exports.updateStubArgValues = {
  title: validEntry.title,
  body: validEntry.body,
};
exports.updateStubArgOptions = { where: { id: validEntry.id, ownerId: user.id } };
