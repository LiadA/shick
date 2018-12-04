// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('passport');

// TODO: start from here next time
// const { getGossip } = require('./routes/getGossip');
// // const { getRestaurants } = require('./routes/getRestaurants');
// const { getSeries } = require('./routes/getSeries');
// const { getRecipes } = require('./routes/getRecipes');
// // const { getCloths } = require('./routes/getCloths');
// const { getEvents } = require('./routes/getEvents');

// const app = express();

// const corsOptions = {
//   origin: [],
//   // Some legacy browsers (such as IE11) choke on 204
//   optionsSuccessStatus: 200,
//   allowedHeaders: ['Content-Type', 'Authorization', 'Metadata'],
// };
// switch (process.env.NODE_ENV) {
//   case 'development':
//   case 'test':
//     corsOptions.origin = [];
//     break;
//   case 'staging':
//     corsOptions.origin = ['http://localhost:3000'];
//     break;
//   case 'production':
//     corsOptions.origin = [
//       // 'https://cc.uk.healthy.io', TODO:  Change the url once set
//     ];
//     break;
//   default:
//     corsOptions.origin = [];
// }

// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// // Enable pre-flight requests for all routes
// app.options('*', cors(corsOptions));

// app.get('/gossip', getGossip);
// // app.get('/restaurants', getRestaurants);
// app.get('/series', getSeries);
// app.get('/recipes', getRecipes);
// // app.get('/clothes', getCloths);
// app.get('/events', getEvents);

// module.exports = app;
