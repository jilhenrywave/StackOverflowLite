const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/sequelize');

const User = sequelize.define(
  'user',
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
  { updatedAt: 'modifiedAt', underscored: true },
);

module.exports = User;
