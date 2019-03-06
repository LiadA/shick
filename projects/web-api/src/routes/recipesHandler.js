const {
  models: { Recipe },
} = require('db');

const getRecipes = async (req, res) => {
  let data;
  try {
    data = await Recipe.findAll();
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
  getRecipes,
};
