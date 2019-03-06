const {
  models: { Restaurant, Recommendation },
} = require('db');

const getRestaurants = async (req, res) => {
  let restaurants;
  try {
    restaurants = await Restaurant.findAll();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
  res.json(restaurants);
};

// {restuarnat:{name:'nam', chefname:'care'},
// recommendation:{rank:5, must_have:'fjdkls', userId}}

const createRestaurant = async (req, res) => {
  const { recommendations, restaurant } = req.body;
  recommendations.userId = req.user.id;
  try {
    await Restaurant.create(
      { ...restaurant, recommendations },
      {
        include: [Restaurant.Recommendations],
      },
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }

  // await Restaurant.create({ ...req.body }, { include: 'jfdks' });

  res.sendStatus(200);
};

// {rank:5, mustHave:[], resturantId:32}

const createRecomendation = async (req, res) => {
  try {
    await Recommendation.create({ ...req.body, userId: req.user.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
};

const getRecommendations = async (req, res) => {
  const { restaurantId } = req.params;
  let recommendations;
  try {
    recommendations = await Recommendation.findAll({ where: { restaurantId } });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }

  res.json(recommendations);
};

module.exports = {
  getRecommendations,
  createRecomendation,
  createRestaurant,
  getRestaurants,
};
