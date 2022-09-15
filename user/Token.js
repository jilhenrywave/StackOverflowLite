const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Token = sequelize.define(
  'Token',
  {
    token: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    updatedAt: 'modifiedAt',
  },
);

module.exports = Token;
