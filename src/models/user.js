'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'editor_id',
      });
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'E-mail inválido'
          }
        }
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
    }
  );
  return User;
};