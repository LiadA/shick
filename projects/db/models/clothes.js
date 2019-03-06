const { dressCodes, itemTypes } = require('../enums.json');

module.exports = function buildClothes(sequelize, DataTypes) {
  const Clothes = sequelize.define('Clothes', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reservations: {
      type: DataTypes.JSONB,
    },
    dressCode: {
      type: DataTypes.ENUM(...dressCodes),
    },
    itemType: {
      type: DataTypes.ENUM(...itemTypes),
    },
  });

  Clothes.associate = models => {
    Clothes.User = Clothes.belongsTo(models.User, {
      as: 'owner',
      foreignKey: { name: 'userId', allowNull: false },
    });
  };
  return Clothes;
};
