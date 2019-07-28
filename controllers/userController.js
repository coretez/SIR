const bcrypt = require('bcrypt');

function userController(User) {
  const BCRYPT_SALT_ROUNDS = 12;
  
  function post(req, res) {
    let user = new User(req.body);

    bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS)
    .then(function (hashedPassword) {
      user.password = hashedPassword;
      user.save();
      res.status(201);
      /* delete user.password before replying */
      return res.json(user)
    })
    .catch(function (error) {
      return res.sendStatus(403).send(error);
    });
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
