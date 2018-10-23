module.exports = function buildGossip(sequelize, DataTypes) {
  const Gossip = sequelize.define('Gossip', {
    headLine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  Gossip.associate = models => {
    Gossip.User = Gossip.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId', allowNull: false },
    });
  };
  return Gossip;
};
