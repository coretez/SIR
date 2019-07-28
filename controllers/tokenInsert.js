const Token = require('../models/tokenModel');

module.exports = function (newToken, res) {
    const token = new Token({
      name: 'loginToken',
      token: newToken,
      roles: ''
    });
    
    token.save((err) => {
      if (err) {
        console.log(`Error in adding to database: ${err}`);
        return res.send(err);
      }
      console.log(`attempting to send cookie ${newToken}`);
      return res
        .cookie('Token', newToken)
        .send(); 
    });
};
