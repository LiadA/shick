const {
  models: { Series },
} = require('db');

const getSeries = async (req, res) => {
  let data;
  try {
    data = await Series.findAll();
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

const createSeries = async (req, res) => {
  const { body, user } = req;
  try {
    await Series.create({ ...body, userId: user.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }

  res.sendStatus(200);
};

module.exports = {
  getSeries,
  createSeries,
};
