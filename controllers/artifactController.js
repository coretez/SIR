function artifactController(Artifact) {
  function post(req, res) {
    const artifact = new Artifact(req.body);
    /* check for required fields */
    if (!req.body.name) {  // no name
      res.status(400);
      return res.send('Name of artifact is required');
    } else if (!req.body.artifact) {  // no artifact object
      res.status(400);
      return res.send('Artifact object is required');
    } 
    //not sure what will go in the artifact just yet

    // else if (!req.body.artifact.id) {
    //   res.status(400);
    //   return res.send('Artifact object ID is required');
    // }

    artifact.save();
    res.status(201);
    return res.json(artifact);
  }

  function get(req, res) {
    const { query } = req;
    Artifact.find(query, (err, artifacts) => {
      if (err) {
        return res.send(err);
      }
      return res.json(artifacts);
    });
  }

  function getById (req, res) { 
    res.json(req.artifact); 
  }

  function putById (req, res) {
    const { artifact } = req;
    /* One-for-one relationship between request (req) elements and the model */
    if (req.body.name) { artifact.name = req.body.name; }
    if (req.body.artifact) { artifact.artifact = req.body.artifact; }
    req.artifact.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(artifact);
    });
  }

  function patchById (req, res) {
    const { artifact } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    // /* check for required fields */
    // if (!req.body.name) {  // no name
    //   res.status(400);
    //   return res.send('Name of artifact is required');
    // } else if (!req.body.artifact) {  // no artifact object
    //   res.status(400);
    //   return res.send('Artifact object is required');
    // } 
    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      artifact[key] = value;
    })
    req.artifact.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(artifact);
    });
  }

  function deleteById (req, res) {
    req.artifact.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    })
  }

  return { post, get, getById, putById, patchById, deleteById };
}

module.exports = artifactController;
