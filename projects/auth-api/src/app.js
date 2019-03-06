const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const getStartegy = require('./buildStrategy');

// TODO: start from here next time
const { login } = require('./handlers/login');

const app = express();

const corsOptions = {
  origin: [],
  // Some legacy browsers (such as IE11) choke on 204
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'Metadata'],
};
switch (process.env.NODE_ENV) {
  case 'development':
  case 'test':
    corsOptions.origin = [];
    break;
  case 'staging':
    corsOptions.origin = ['http://localhost:3000'];
    break;
  case 'production':
    corsOptions.origin = [
      // 'https://cc.uk.healthy.io', TODO:  Change the url once set
    ];
    break;
  default:
    corsOptions.origin = [];
}
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(bodyParser.json());
passport.use(getStartegy());

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

app.post('/login', login);

app.post('/userInfo', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

module.exports = app;
