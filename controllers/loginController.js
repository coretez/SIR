const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

function authenticationController(User) {
  const BCRYPT_SALT_ROUNDS = 12;

  function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log('In login post');

    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.send(err);
      }

      console.log(`Have a user ${username} with password ${password}`);

      /* We need to first check there is a record and then check hashes match */
      if (bcrypt.compare(password, user.password)) {
        let token = jwt.sign({ username: user.username },
          config.secret,
          {
            expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        return res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      };

      return res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
    });
  }

  return { login };
}

module.exports = authenticationController;
