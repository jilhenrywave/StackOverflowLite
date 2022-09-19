const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/sequelize');

const Question = sequelize.define(
  'Question',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
      onDelete: 'CASCADE',
    },
    answerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'answers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  { updatedAt: 'modifiedAt' },
);

module.exports = Question;
