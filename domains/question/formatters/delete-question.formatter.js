const deleteQuestionFormatter = (id, user) => ({ id, ownerId: user.id });

module.exports = deleteQuestionFormatter;
