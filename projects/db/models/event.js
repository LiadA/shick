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
    // Event.Users = Event.hasMany(models.User, {
    //   as: 'invited',
    //   foreignKey: { name: 'userId', allowNull: false },
    // }); // TODO:
    Event.User = Event.belongsTo(models.User, {
      as: 'celebrater',
      foreignKey: { name: 'userId', allowNull: false },
    });
  };
  return Event;
};
