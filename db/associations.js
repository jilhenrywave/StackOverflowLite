const { Answer } = require('./model-handler');
const { Question } = require('./model-handler');
const { Token } = require('./model-handler');
const { User } = require('./model-handler');

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Question, { foreignKey: 'ownerId' });
Question.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

User.hasMany(Answer, { foreignKey: 'ownerId' });
Answer.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });
