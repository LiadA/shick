const { gossipSchema, seriesSchema } = require('./schema');

const schemaPath = {
  '/gossip': gossipSchema,
  '/series': seriesSchema,
};

const inputValidation = async (req, res, next) => {
  const schema = schemaPath[req.path];
  if (schema) {
    try {
      schema(req.body);
      next();
    } catch (error) {
      console.log('Incoming request is not formatted correctly', { error });
      res.sendStatus(400);
    }
  } else {
    console.log('No schema found for route');
    res.sendStatus(500);
  }
};
inputValidation.unless = require('express-unless');

module.exports = {
  inputValidation,
};
