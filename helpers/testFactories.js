const { models, enums } = require('db');
const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies

/* eslint-disable no-await-in-loop, no-empty */
const userFactory = async (overrides = {}) => {
  let user;
  do {
    try {
      user = await models.User.create({
        name: faker.name.findName(),
        nickname: faker.internet.userName(),
        birthday: Date.now(),
        rank: 0,
        birthControl: 'yasmin',
        status: faker.random.arrayElement(enums.statusType),
        email: faker.internet.email(),
        ...overrides,
      });
    } catch (error) {}
  } while (user == null);
  return user;
};
/* eslint-enable no-await-in-loop */

const clothesFactory = async (overrides = {}) => {
  const user = await models.User.findOne();
  return models.Clothes.create({
    userId: user.id,
    title: faker.name.title(),
    date: Date.now(),
    startReserve: Date.now(),
    endReserve: Date.now(),
    dressCode: faker.random.arrayElement(enums.dressCodes),
    itemType: faker.random.arrayElement(enums.itemTypes),
    ...overrides,
  });
};

const restaurantFactory = async (overrides = {}) =>
  models.Restaurant.create({
    name: faker.name.firstName(),
    chefName: faker.name.findName(),
    rank: faker.random.number({ min: 0, max: 5 }),
    ...overrides,
  });

const recommendationFactory = async (overrides = {}) => {
  const user = await models.User.findOne();
  const restaurant = await models.Restaurant.findOne();
  return models.Recommendation.create({
    comment: faker.random.words(),
    rank: faker.random.number({ min: 0, max: 5 }),
    mustHave: [faker.random.word()],
    beCareful: [faker.random.word()],
    restaurantId: restaurant.id,
    userId: user.id,
    ...overrides,
  });
};
const seriesFactory = async (overrides = {}) => {
  const user = await models.User.findOne();
  return models.Series.create({
    name: faker.random.word(),
    source: faker.random.arrayElement(enums.sourceOptions),
    type: [faker.random.arrayElement(enums.seriesTypeOptions)],
    rank: faker.random.arrayElement(enums.rankOptions),
    userId: user.id,
    ...overrides,
  });
};

const gossipFactory = async (overrides = {}) => {
  const user = await models.User.findOne();
  return models.Gossip.create({
    headLine: faker.random.words(),
    description: faker.random.words(),
    userId: user.id,
    ...overrides,
  });
};

const recipeFactory = async (overrides = {}) =>
  models.Recipe.create({
    dishName: faker.random.words(),
    description: faker.random.words(),
    ingredients: { eggs: 2, flour: 1.5 },
    process: faker.random.words(),
    ...overrides,
  });

const eventFactory = async (overrides = {}) => {
  const user = await models.User.findOne();
  return models.Event.create({
    title: faker.random.words(),
    date: Date.now(),
    location: "stav's home",
    description: faker.random.words(),
    duration: 2,
    userId: user.id,
    ...overrides,
  });
};

module.exports = {
  clothesFactory,
  userFactory,
  restaurantFactory,
  recommendationFactory,
  seriesFactory,
  gossipFactory,
  recipeFactory,
  eventFactory,
};
