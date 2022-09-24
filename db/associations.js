const { Answer, Question, Token, User, Comment } = require('./model-handler');

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Question, { foreignKey: 'ownerId' });
Question.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

User.hasMany(Answer, { foreignKey: 'ownerId' });
Answer.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

User.hasMany(Comment, { foreignKey: 'ownerId' });
Comment.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
