#!/usr/bin/env node

const repl = require('repl');
const { models, getSequelize } = require('db');
const stubber = require('./stubber.js');

const sequelize = getSequelize();

/* eslint-disable no-console */
sequelize.sync().then(() => console.log('\n\n\nREADY TO BE A DB\n\n\n'));
/* eslint-enable */

// NOTE: Maybe add env to the prompt?
const replInstance = repl.start({ prompt: '> ' });

Object.defineProperty(replInstance.context, 'sequelize', {
  configurable: false,
  enumerable: true,
  value: sequelize,
});

Object.keys(models).forEach(name =>
  Object.defineProperty(replInstance.context, name, {
    configurable: false,
    enumerable: true,
    value: models[name],
  }),
);

stubber(replInstance);
