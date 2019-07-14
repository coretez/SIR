function artifactController(Artifact) {
  function post(req, res) {
    const artifact = new Artifact(req.body);
    /* check for required fields */
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }

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

  function getById (req, res) 
  { 
    res.json(req.artifact); 
  }

  function putById (req, res) {
    const { artifact } = req;
    /* One-for-one relationship between request (req) elements and the model */
    artifact.title = req.body.title;
    artifact.author = req.body.author;
    artifact.genre = req.body.genre;
    ticartifactket.read = req.body.read;
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
