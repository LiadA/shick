const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const enums = require('./enums.json');
const { initLocalSettings, initEncryptedSettings } = require('./config.js');

const { NODE_ENV } = process.env;

const models = {};
let sequelize;

const init = settings => {
  sequelize = new Sequelize(
    settings.database,
    settings.username,
    settings.password,
    settings.options,
  );

  fs.readdirSync(path.join(__dirname, 'models'))
    .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, 'models', file));
      models[model.name] = model;
    });

  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

// Init quickly if we're testing or developing
if (!sequelize && ['test', 'development'].includes(NODE_ENV)) {
  init(initLocalSettings());
}

// NOTE: Init should be called by each server entry point
/* eslint-disable no-console */
const initDb = async () => {
  // Initialize only once
  if (sequelize) return;

  // TODO: test if we can use belogger instead of console logging
  // Initialize according to env
  console.log('Initializing Sequelize');
  const settings = await initEncryptedSettings();
  init(settings);
  console.log('Sequelize is ready');
};
/* eslint-enable no-console */

const getSequelize = () => sequelize;

module.exports = { initDb, models, getSequelize, enums };
