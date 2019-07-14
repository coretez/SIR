const express = require('express');
const artifactsController = require('../controllers/artifactController');

function routes (Artifact) {
  const artifactRouter = express.Router();
  const controller = artifactsController(Artifact);

  artifactRouter.route('/artifacts')
  .post(controller.post)
  .get(controller.get);

  /* This is the middleware to map a single event by ID to the artifact attribute */
  artifactRouter.use('/artifacts/:artifactId', (req, res, next) => {
    Artifact.findById(req.params.artifactId, (err, artifact) => {
      if (err) {
        return res.send(err);
      }
      if (artifact) {
        req.artifact = artifact;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  artifactRouter.route('/artifacts/:artifactId')
    .get(controller.getById)
    .put(controller.putById)
    .patch(controller.patchById)
    .delete(controller.deleteById);

  return artifactRouter;
}

module.exports = routes
