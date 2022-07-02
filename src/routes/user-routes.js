const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router
  .get('/usuarios', UserController.listUsers)
  .get('/usuario/:id', UserController.findUserId)
  .post('/cadastro', UserController.createUser)
  .put('/usuario/:id', UserController.updateUser)
  .delete('/usuario/:id', UserController.deleteUser);
  
module.exports = router;