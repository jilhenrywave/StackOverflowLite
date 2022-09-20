const { question } = require('../entities/question-test-entity');
const { user } = require('../entities/user-test-entity');

const invalidAnswer = { answer: ' ', questionId: question.id };
const invalidQuestionId = { answer: 'Valid answer', questionId: 'some-invalid-id' };
const validEntry = { answer: 'Valid answer', questionId: question.id };

exports.invalidEntries = { invalidAnswer, invalidQuestionId };
exports.validEntry = validEntry;
exports.formattedResponse = { answerBody: validEntry.answer, questId: validEntry.questionId, user };
