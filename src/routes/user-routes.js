const { Router } = require('express');
const passport = require('passport');
const UserController = require('../controllers/UserController');
const router = Router();

router
  .get("/usuarios", UserController.listUsers)
  .get("/usuario/:id", UserController.findUserId)
  .get("/usuario/:editorId/posts", UserController.getPoststoUser)
  .post("/cadastro", UserController.createUser)
  .post("/usuario/:id/restaura", UserController.restoreUser)
  .put("/usuario/:id", UserController.updateUser)
  .delete("/usuario/:id", UserController.deleteUser)
  .post(
    "/usuario/login",
    passport.authenticate("local", { session: false }),
    UserController.login
  )

  
module.exports = router;