const Question = require('../domains/question/models/Question');
const Token = require('../domains/user/models/Token');
const User = require('../domains/user/models/User');

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Question, { foreignKey: 'ownerId' });
Question.belongsTo(User, { as: 'owner' });
