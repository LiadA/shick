module.exports = function buildRecommendation(sequelize, DataTypes) {
  const Recommendation = sequelize.define(
    'Recommendation',
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
      mustHave: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      beCareful: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      hooks: {
        afterCreate: async recommendation => {
          // TODO: Debug hook
          const restaurant = await sequelize.models.Restaurant.find({
            where: { id: recommendation.restaurantId },
            include: [sequelize.models.Restaurant.Recommendations],
          });
          let sum = 0;
          const len = restaurant.recommendations.length;
          for (let i = 0; i < len; i += 1) {
            sum += restaurant.recommendations[i].rank;
          }
          await restaurant.update({ rank: sum / len });
        },
      },
    },
  );

  Recommendation.associate = models => {
    Recommendation.Restaurant = Recommendation.belongsTo(models.Restaurant, {
      as: 'restaurant',
      foreignKey: { name: 'restaurantId', allowNull: false },
    });
    Recommendation.User = Recommendation.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId', allowNull: false },
    });
  };

  return Recommendation;
};
