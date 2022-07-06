const models = require('../models');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


class UserController {
  
  static async listUsers(req, res) {
    try {
      const users = await models.User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async findUserId(req, res) {
    const { id } = req.params;
    try {
      const user = await models.User.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async createUser(req, res) {
    const { name, birthdate, email, password, role_id } = req.body;
    const formattedDate = birthdate.split("/").reverse().join("-");

    try {
      const passwordHash = await models.User.addPassword(password);
      const user = await models.User.create({
        name,
        birthdate: formattedDate,
        email,
        password: passwordHash,
        role_id: Number(role_id),
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await models.User.update(data, {
        where: {
          id,
        },
      });
      const updatedUser = await models.User.findAll({
        where: {
          id: id,
        },
      });
      return res.status(201).json({ updatedUser });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      models.sequelize.transaction(async (transaction) => {
        models.User.destroy(
          {
            where: {
              id,
            },
          },
          { transaction: transaction }
        );
        return res
          .status(200)
          .json(`Usuário de id = ${id} foi deletado com sucesso`);
      });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async restoreUser(req, res) {
    const { id } = req.params;
    try {
      models.User.restore({
        where: {
          id,
        },
      });
      return res
        .status(201)
        .json(`Usuário de id = ${id} foi restaurado com sucesso`);
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async getPoststoUser(req, res) {
    const { editorId } = req.params;
    console.log(editorId);
    try {
      const allPostUser = await models.Post.findAndCountAll({
        where: {
          editor_id: Number(editorId),
        },
        limit: 5,
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(allPostUser);
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }
  
  static degub() {
    console.log('função de debug')
  }

  static async login(req, res) {
    const token = UserController.createTokenJWT(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  }
  
  static createTokenJWT(user) {
    const payload = {
      id: user.id,
    };
  
    const token = jwt.sign(payload, 's');
  
    return token;
  }
}

module.exports = UserController;