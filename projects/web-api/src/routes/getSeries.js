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

module.exports = {
  getSeries,
};
