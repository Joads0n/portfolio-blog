const passport = require('passport');
const { Router } = require('express');
const UserController = require('../controllers/UserController');
const middlewaresAuth = require('../middlewares');

const router = Router();

router
  .get(
    "/usuarios",
    passport.authenticate("bearer", { session: false }),
    UserController.listUsers
  )
  .get("/usuario/:id", UserController.findUserId)
  .get("/usuario/:editorId/posts", UserController.getPoststoUser)
  .post("/cadastro", UserController.createUser)
  .post("/usuario/:id/restaura", UserController.restoreUser)
  .put("/usuario/:id", UserController.updateUser)
  .delete("/usuario/:id", UserController.deleteUser)
  .post("/usuario/login", middlewaresAuth.local, UserController.login);

  
module.exports = router;