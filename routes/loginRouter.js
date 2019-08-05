const express = require('express');
const authenticationController = require('../controllers/loginController');

function routes (User) {
  const authenticationRouter = express.Router();
  const controller = authenticationController(User);

  authenticationRouter.post('/')
  .post(controller.login)

  return authenticationRouter;
}

module.exports = routes
