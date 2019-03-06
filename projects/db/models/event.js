module.exports = function buildEvent(sequelize, DataTypes) {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.FLOAT,
    },
  });

  Event.associate = models => {
    Event.User = Event.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId', allowNull: false },
    });
  };
  return Event;
};
