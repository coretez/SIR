/* eslint-disable no-param-reassign */
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

const ticketRouter = require('./routes/ticketRouter')(Ticket);
const userRouter = require('./routes/userRouter')(User);
const artifactRouter = require('./routes/artifactRouter')(Artifact);

app.use(bodyParser.urlencoded({ extended: true }));
/* Check to see if the incoming format is correct */
app.use(bodyParser.json(), (error, req, res, next) => {
  if (error instanceof SyntaxError) {
    return res.sendStatus(400);
  } else {
    next();
  }
});

app.use('/api/artifacts', artifactRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/users', userRouter);

app.server = app.listen(port, () => {
  console.log(`Express server started on port: ${port}`);
});

module.exports = app;
