/* eslint-disable no-param-reassign */
const express = require('express');
const uuidv4 = require('uuid/v4');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
// const { insert } = require('./controllers/tokenController');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('this is a test database');
  const db = mongoose.connect('mongodb://localhost/SirAPI-testdatabase', { useNewUrlParser: true });
} else {
  const db = mongoose.connect('mongodb://localhost/SirAPI', { useNewUrlParser: true });
}

const port = process.env.PORT || 3000;
const Ticket = require('./models/ticketModel');
const User = require('./models/userModel');
const Artifact = require('./models/artifactModel');
const Token = require('./models/tokenModel');

const ticketRouter = require('./routes/ticketRouter')(Ticket);
const tokenRouter = require('./routes/tokenRouter')(Token);
const tokenMiddleware = require('./routes/tokenMiddleware')(Token);
const userRouter = require('./routes/userRouter')(User);
const artifactRouter = require('./routes/artifactRouter')(Artifact);

const tokenInsert = require ('./controllers/tokenInsert');

const config = require('./config/main.js');
const BCRYPT_SALT_ROUNDS = 12;

function login(req, res) {
  console.log(req.body);

  var username = req.body.username;
  var myPlaintextPassword = req.body.password;

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return res.send(err);
    }

    /* We need to first check there is a record and then check hashes match */
    if (user) {
      bcrypt.compare(myPlaintextPassword, user.password, function(err, result) {
        if (err) {
          return res.sendStatus(401);
        }
        if (result) {
          const newToken = uuidv4();
          const token = new Token({
            name: 'loginToken',
            token: newToken,
            roles: ''
          });
          console.log('Authenticated');
          token.save((err) => {
            if (err) {
              console.log(`Error in adding to database: ${err}`);
              return res.send(err);
            }
          });
          return res.send ({
            name: 'loginToken',
            token: newToken
          });
        }
        return res.sendStatus(401);
      })
    } else {
      return res.sendStatus(401);
    }
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* Check to see if the incoming format is correct */
app.use(bodyParser.json(), (error, req, res, next) => {
  if (error instanceof SyntaxError) {
    return res.sendStatus(400);
  } else {
    next();
  }
});

app.use('/api/artifacts', tokenMiddleware, artifactRouter);
app.use('/api/tickets', tokenMiddleware, ticketRouter);
// Add back token middleware after testing

app.use('/api/tokens', tokenMiddleware, tokenRouter);
app.use('/api/users', tokenMiddleware, userRouter);

app.use('/dev/users', userRouter);
app.use('/dev/tokens', tokenRouter);

app.post('/api/login', login);

app.get('/app', function(req, res){
  res.sendFile(__dirname + '/spa/index.html');
});

app.get('/home', (req, res) => {
  return res.json({
    success: true,
    message: 'Index page'
  })
});

app.server = app.listen(port, () => {
  console.log(`Express server started on port: ${port}`);
});

module.exports = app;
