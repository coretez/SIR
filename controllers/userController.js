function userController(User) {
  function post(req, res) {
    const user = new User(req.body);
    user.save();
    res.status(201);
    return res.json(user);
  }

  function get(req, res) {
    const { query } = req;
    User.find(query, (err, users) => {
      if (err) {
        return res.send(err);
      }
      return res.json(users);
    });
  }

  function getById (req, res) 
  { 
    res.json(req.user); 
  }

  function putById (req, res) {
    const { user } = req;
    /* One-for-one relationship between request (req) elements and the model */
    user.title = req.body.title;
    user.author = req.body.author;
    user.genre = req.body.genre;
    user.read = req.body.read;
    req.user.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    });
  }

  function patchById (req, res) {
    const { user } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      user[key] = value;
    })
    req.user.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    });
  }

  function deleteById (req, res) {
    req.user.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    })
  }

  return { post, get, getById, putById, patchById, deleteById };
}

module.exports = userController;
