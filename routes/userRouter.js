const express = require('express');
const usersController = require('../controllers/userController');

function routes (User) {
  const userRouter = express.Router();
  const controller = usersController(User);

  userRouter.route('/')
  .post(controller.post)
  .get(controller.get);

  /* This is the middleware to map a single event by ID to the user attribute */
  userRouter.use('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  userRouter.route('/:userId')
    .get(controller.getById)
    .put(controller.putById)
    .patch(controller.patchById)
    .delete(controller.deleteById);

  return userRouter;
}

module.exports = routes
