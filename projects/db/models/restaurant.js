module.exports = function buildRestaurant(sequelize, DataTypes) {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    chefName: {
      type: DataTypes.STRING,
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
  });

  Restaurant.associate = models => {
    Restaurant.Recomendations = Restaurant.hasMany(models.Recomendation, {
      as: 'recomendations',
      foreignKey: { name: 'restaurantId', allowNull: false },
    });
  };
  return Restaurant;
};
