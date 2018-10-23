const { rankNumbers } = require('../enums.json');

module.exports = function buildRecomendation(sequelize, DataTypes) {
  const Recomendation = sequelize.define('Recomendation', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.ENUM(...rankNumbers),
      defaultValue: 0,
    },
    mustHave: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    BeCareful: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });

  Recomendation.associate = models => {
    Recomendation.Restaurant = Recomendation.belongsTo(models.Restaurant, {
      as: 'restaurant',
      foreignKey: { name: 'restaurantId', allowNull: false },
    });
    Recomendation.User = Recomendation.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId', allowNull: false },
    });
  };

  return Recomendation;
};
