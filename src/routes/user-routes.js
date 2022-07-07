const { Router } = require('express');
const middlewaresAuth = require('../middlewares');
const UserController = require('../controllers/UserController');

const router = Router();

router
  .get("/usuarios", middlewaresAuth.bearer, UserController.listUsers)
  .get("/usuario/:id", UserController.findUserId)
  .get("/usuario/:editorId/posts", UserController.getPoststoUser)
  .post("/cadastro", UserController.createUser)
  .post("/usuario/:id/restaura", UserController.restoreUser)
  .put("/usuario/:id", UserController.updateUser)
  .delete("/usuario/:id", UserController.deleteUser)
  .post("/usuario/login", middlewaresAuth.local, UserController.login);

  
module.exports = router;