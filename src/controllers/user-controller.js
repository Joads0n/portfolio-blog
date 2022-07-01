const models = require('../models');

class UserController {
  static async listUsers(req, res) {
    try {
      const users = await models.User.findAll();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async findUserId(req, res) {
    const { id } = req.params;
    try {
      const user = await models.User.findAll({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async createUser(req, res) {
    const { name, birthdate, email, password, role_id } = req.body;
    const formattedDate = birthdate.split("/").reverse().join("-");

    try {
      const user = await models.User.create({
        name,
        birthdate: formattedDate,
        email,
        password,
        role_id: Number(role_id),
      });
      return res.status(201).json({ user });
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
      models.User.destroy({
        where: {
          id,
        },
      });
      return res
        .status(201)
        .json(`Usuário de id = ${id} foi deletado com sucesso`);
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }
}

module.exports = UserController;