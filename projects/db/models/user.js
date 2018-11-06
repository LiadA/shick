const { statusType } = require('../enums.json');

module.exports = function buildUser(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    birthControl: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(...statusType),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true,
    },
  });
  User.associate = models => {
    User.Recommendations = User.hasMany(models.Recommendation, {
      as: 'recommendations',
      foreignKey: { name: 'userId', allowNull: false },
    });
    User.Gossip = User.hasMany(models.Gossip, {
      as: 'gossip',
      foreignKey: { name: 'userId', allowNull: false },
    });
    User.Clothes = User.hasMany(models.Clothes, {
      as: 'clothes',
      foreignKey: { name: 'userId', allowNull: false },
    });
    User.Series = User.hasMany(models.Series, {
      as: 'series',
      foreignKey: { name: 'userId', allowNull: false },
    });
    User.Events = User.belongsToMany(models.Event, {
      as: 'events',
      through: 'EventUser',
    });
  };
  return User;
};
