const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authentication = require('./middleware/authentication');
const { inputValidation } = require('./middleware/inputValidation');
const { getGossip, createGossip } = require('./routes/gossipHandler');
const {
  getRestaurants,
  createRestaurant,
  createRecomendation,
  getRecommendations,
} = require('./routes/restaurantsHandler');
const { getSeries, createSeries } = require('./routes/seriesHandler');
const { getRecipes } = require('./routes/recipesHandler');
const { getClothes, addClothes, addReservation } = require('./routes/clothesHandler');
const { getEvents, addEvent } = require('./routes/eventsHandler');

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
app.use(bodyParser.json());
app.use(authentication);
// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

app.get('/gossip', getGossip);
app.post('/gossip', inputValidation, createGossip);
app.get('/restaurants', getRestaurants);
app.post('/restaurant', createRestaurant);
app.post('/recommendation', createRecomendation);
app.get('/recommendations/:restaurantId', getRecommendations);
app.get('/series', getSeries);
app.post('/series', inputValidation, createSeries);
app.get('/recipes', getRecipes);
app.get('/clothes', getClothes);
app.post('/clothes', addClothes);
app.post('/reservation', addReservation);
app.get('/events', getEvents);
app.post('/event', addEvent);

module.exports = app;
// TODO: check all routs
// TODO: add recipe
