'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const validations = require('../errors');

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

    static generatePasswordHash(password) {
      const charge = 12;
      return bcrypt.hash(password, charge);
    }

    static async addPassword(password) {
      validations.emptyStringField(password, "Senha");
      validations.maximumSizeField(password, "Senha", 60);
      validations.minimumSizeField(password, "Senha", 8);

      return await this.generatePasswordHash(password);
    }

    /** Metodo não trata o erro caso o retorno da busca seja null */
    static async buscarEmail(email) {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      // if(user === null) {
      //   throw new Error("Email não localizado na base de dados");
      // }

      return user;
    }

    static async getUserById(id) {
      const user = await User.findByPk(id);
      if (user === null) {
        throw new Error("Não foi possível encontrar o usuário");
      }
      return user;
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