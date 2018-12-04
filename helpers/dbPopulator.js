const { getSequelize } = require('db');
const {
  clothesFactory,
  userFactory,
  restaurantFactory,
  recommendationFactory,
  seriesFactory,
  gossipFactory,
  recipeFactory,
  eventFactory,
} = require('./testFactories');

const sequelize = getSequelize();

/* eslint-disable no-console */
const populateDb = async () => {
  console.log(`Populating DB for env: ${process.env.NODE_ENV}...`);
  await sequelize.sync({ force: true });
  try {
    await userFactory({ name: 'stav' });
  } catch (error) {
    console.log(error);
  }
  const user = await userFactory({ name: 'shir' });
  try {
    await clothesFactory();
  } catch (error) {
    console.log(error);
  }
  const event = await eventFactory();
  user.addEvent(event);
  await restaurantFactory();
  await recommendationFactory();
  await seriesFactory();
  await gossipFactory();
  await recipeFactory();

  await sequelize.close();
  console.log('DB ready to use');
};
/* eslint-enable no-console */

populateDb();
