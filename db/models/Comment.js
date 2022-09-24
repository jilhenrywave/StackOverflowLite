const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Comment = sequelize.define(
  'comment',
  {
    id: {
      type: DataTypes.UUID,
      default: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
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
      allowNull: false,
      references: {
        model: 'answers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    updatedAt: 'modifiedAt',
    underscored: true,
  },
);

module.exports = Comment;
