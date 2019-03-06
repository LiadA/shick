const {
  models: { Clothes },
} = require('db');

const getClothes = async (req, res) => {
  let data;
  try {
    data = await Clothes.findAll();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
  res.json(data);
};

const addClothes = async (req, res) => {
  const { body, user } = req;
  try {
    await Clothes.create({ ...body, userId: user.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
};

const addReservation = async (req, res) => {
  const { body, user } = req;
  const { date, clothesId } = body;
  let clothes;
  try {
    clothes = await Clothes.findById(clothesId);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
  if (!clothes) {
    res.sendStatus(404);
    return;
  }
  const { reservations } = clothes;
  reservations.push({ reserver: user.id, date });
  await clothes.update();
  res.send(clothes);
};

module.exports = {
  getClothes,
  addClothes,
  addReservation,
};
