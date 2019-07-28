const express = require('express');
const tokenController = require('../controllers/tokenController');

function routes (Token) {
  const tokenRouter = express.Router();
  const controller = tokenController(Token);

  tokenRouter.route('/')
  .post(controller.post)
  .get(controller.get);

  /* This is the middleware to map a single event by ID to the user attribute */
  tokenRouter.use('/:tokenId', (req, res, next) => {
    Token.findById(req.params.tokenId, (err, token) => {
      if (err) {
        return res.send(err);
      }
      if (token) {
        req.token = token;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  tokenRouter.route('/:tokenId')
    .get(controller.getById)
    .put(controller.putById)
    .patch(controller.patchById)
    .delete(controller.deleteById);

  return tokenRouter;
}

module.exports = routes
