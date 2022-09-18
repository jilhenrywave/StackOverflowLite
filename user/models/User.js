const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');
const Question = require('../../question/models/Question');
const Token = require('./Token');

const User = sequelize.define(
  'User',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    updatedAt: 'modifiedAt',
  },
);

User.hasMany(Token, { foreignKey: 'userId' });
User.hasMany(Question, { foreignKey: 'ownerId' });

module.exports = User;
