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

module.exports = {
  getGossip,
};
