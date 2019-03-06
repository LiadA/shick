const jwt = require('jsonwebtoken');
const {
  models: { User },
} = require('db');

const expiresIn = '12h';

const login = async (req, res) => {
  let currentUser;
  const { username, password } = req.body;
  try {
    currentUser = await User.findOne({
      where: { username },
      attributes: ['id', 'password', 'name', 'nickname'],
    });
  } catch (error) {
    console.log(`Failed to find user. error is: ${error} .username is ${username}`);
    res.sendStatus(500);
    return;
  }

  if (!currentUser) {
    console.log('Login attempt with unknown user');
    res.sendStatus(401);
    return;
  }
  if (currentUser.password !== password) {
    console.log('Login attempt with wrong password');
    res.sendStatus(401);
    return;
  }
  // if (!currentUser.comparePassword(password)) {
  //   logAndAlert('Login attempt with wrong password', {});
  //   res.sendStatus(401);
  //   return;
  // }

  const accessToken = jwt.sign(
    { name: currentUser.name, nickname: currentUser.nickname, userId: currentUser.id },
    'shickoniot',
    {
      expiresIn,
    },
  );
  res.json({ accessToken, expiresIn });
};

module.exports = {
  login,
};
