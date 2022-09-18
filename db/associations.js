const Question = require('../question/models/Question');
const Token = require('../user/models/Token');
const User = require('../user/models/User');

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Question, { foreignKey: 'ownerId' });
Question.belongsTo(User, { as: 'owner' });
