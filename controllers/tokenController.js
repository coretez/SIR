function tokenController(Token) {
  
  function insert(newToken, callback) {
    const token = new Token({
      name: 'loginToken',
      token: newToken,
      roles: ''
    });
    token.save((err) => {
      if (err) {
        // It all falls apart
        return res.send(err);
      }
      return callback;
    });
  }

  function post(req, res) {
    const token = new Token(req.body);
    /* check for required fields */
    if (!req.body.token) {
      res.send(400);
      return res.send('Token is required');
    }

    token.save();
    res.status(201);
    return res.json(token);
  }

  function get(req, res) {
    const { query } = req;
    Token.find(query, (err, tokens) => {
      if (err) {
        return res.send(err);
      }
      return res.json(tokens);
    });
  }

  function getById (req, res) 
  { 
    res.json(req.token); 
  }

  function putById (req, res) {
    const { token } = req;
    /* One-for-one relationship between request (req) elements and the model */
    token.name = req.body.name;
    token.token = req.body.token;
    token.roles = req.body.roles;
    req.token.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(token);
    });
  }

  function patchById (req, res) {
    const { token } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      token[key] = value;
    })
    req.token.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(token);
    });
  }

  function deleteById (req, res) {
    req.token.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    })
  }

  return { insert, post, get, getById, putById, patchById, deleteById };
}

module.exports = tokenController;
