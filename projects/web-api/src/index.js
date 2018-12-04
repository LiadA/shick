/* eslint-disable global-require, no-console */
const { initDb } = require('db');

const startServer = async () => {
  // Start listening on given port or default
  const port = process.env.PORT || 3000;
  await initDb();
  return port;
};

startServer()
  .then(port => {
    const app = require('./app');
    console.log('Server ready to start');
    app.listen(port, () => {
      console.log(`WEB API now listening on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Error starting the server', error);
  });
