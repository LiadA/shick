const {
  models: { Event },
} = require('db');

const getEvents = async (req, res) => {
  let data;
  // TODO: Get from request headers
  const userId = 1;
  try {
    data = await Event.findAll({ where: { userId } });
    // const stam = Event.findAll({ where: { id:data. } });
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
  getEvents,
};
