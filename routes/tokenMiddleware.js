const express = require('express');

// Need to add promised to MongoDB or else the middleware sees a second call between the 
// findOne for authenticatiopn and the next call.

function routes (Token) {
  const tokenMiddleware = express.Router();

  tokenMiddleware.use('/', (req, res, next) => {

    let token = req.headers['token']; // Express headers are auto converted to lowercase

    if (token) {
      const query = {
        token: token 
      };
      Token.find(query, (err, tokens) => {
        if (err) {
          return res.send(err);
        }
        if (tokens.length === 0) {
          console.log('Token not found');
          // This should end the process
          return res.status(401);
        } else {
          return next()
        }
       })
    } else {
      // No token provided
      return res.end();
    }
  });

  return tokenMiddleware;
}

module.exports = routes
