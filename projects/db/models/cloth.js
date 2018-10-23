const { dressCodes, itemTypes } = require('../enums.json');

module.exports = function buildCloth(sequelize, DataTypes) {
  const Cloth = sequelize.define('Cloth', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startReserve: {
      type: DataTypes.DATE,
    },
    endReserve: {
      type: DataTypes.DATE,
    },
    dressCode: {
      type: DataTypes.ENUM(...dressCodes),
    },
    itemType: {
      type: DataTypes.ENUM(...itemTypes),
    },
  });

  Cloth.associate = models => {
    // Event.Users = Event.hasMany(models.User, {
    //   as: 'invited',
    //   foreignKey: { name: 'userId', allowNull: false },
    // }); //TODO:
    Cloth.User = Cloth.belongsTo(models.User, {
      as: 'owner',
      foreignKey: { name: 'userId', allowNull: false },
    });
  };
  return Cloth;
};
