const {
  models: { Gossip },
} = require('db');

const getGossip = async (req, res) => {
  let data;
  try {
    data = await Gossip.findAll();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }

  if (!data) {
    res.sendStatus(404);
    return;
  }
  res.json(data);
};

const createGossip = async (req, res) => {
  const { body, user } = req;
  try {
    await Gossip.create({ ...body, userId: user.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }

  res.sendStatus(200);
};

module.exports = {
  getGossip,
  createGossip,
};
