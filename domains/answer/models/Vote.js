const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/sequelize');

const Vote = sequelize.define(
  'vote',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    answerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'answers',
        key: 'id',
      },
    },
  },
  {
    updatedAt: 'modifiedAt',
    underscored: true,
    indexes: [{ unique: true, fields: ['user_id', 'answer_id'] }],
  },
);

module.exports = Vote;
