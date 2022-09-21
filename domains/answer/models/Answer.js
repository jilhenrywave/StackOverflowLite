const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/sequelize');

const Answer = sequelize.define(
  'answer',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    updatedAt: 'modifiedAt',
    underscored: true,
  },
);

module.exports = Answer;
