'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: "editor_id",
      });
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};