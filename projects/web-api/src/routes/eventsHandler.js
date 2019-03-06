const {
  models: { Event },
} = require('db');

const getEvents = async (req, res) => {
  let data;

  try {
    data = await Event.findAll();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }

  res.json(data);
};

const addEvent = async (req, res) => {
  const { body, user } = req;

  try {
    await Event.create({ ...body, userId: user.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
};

module.exports = {
  getEvents,
  addEvent,
};
