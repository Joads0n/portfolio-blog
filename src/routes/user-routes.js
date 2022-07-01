const { Router } = require('express');
const UserController = require("../controllers/user-controller");

const router = Router();

router
  .get("/usuarios", UserController.listUsers)
  .get("/usuario/:id", UserController.findUserId)

module.exports = router;