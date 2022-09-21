const Answer = require('../domains/answer/models/Answer');
const Vote = require('../domains/answer/models/Vote');
const Question = require('../domains/question/models/Question');
const Token = require('../domains/user/models/Token');
const User = require('../domains/user/models/User');

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Question, { foreignKey: 'ownerId' });
Question.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

User.hasMany(Answer, { foreignKey: 'ownerId' });
Answer.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

Answer.hasMany(Vote, { foreignKey: 'answerId' });
Vote.belongsTo(Answer, { foreignKey: 'answerid' });
