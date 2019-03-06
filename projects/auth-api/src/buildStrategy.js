const passportJWT = require('passport-jwt');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;
const {
  models: { User },
} = require('db');

module.exports = function getStartegy() {
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromBodyField('authorization'); // ExtractJwt.fromBodyField('authorization');
  jwtOptions.secretOrKey = 'shickoniot';

  const strategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
    const currentUser = await User.findById(jwtPayload.userId);

    if (currentUser) {
      next(null, currentUser);
    } else {
      next(null, false);
    }
  });
  return strategy;
};
