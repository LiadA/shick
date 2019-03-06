const axios = require('axios');

const config = {
  development: 'http://localhost:3001',
  test: 'test',
  staging: 'http://auth-api:3000',
  production: 'http://auth-api:3000',
};

const authentication = async (req, res, next) => {
  const header = req.headers.authorization;
  let userInfoRes;
  try {
    userInfoRes = await axios.post(`${config[process.env.NODE_ENV]}/userInfo`, {
      authorization: header,
    });
    req.user = userInfoRes.data;
    next();
  } catch (error) {
    console.log('User should re-authenticate', { error });
    res.sendStatus(401);
  }
};
authentication.unless = require('express-unless');

module.exports = authentication;
