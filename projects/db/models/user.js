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
    User.Recomendations = User.hasMany(models.Recomendation, {
      as: 'recomendations',
      foreignKey: { name: 'userId', allowNull: false },
    });
    User.Gossips = User.hasMany(models.Gossip, {
      as: 'gossips',
      foreignKey: { name: 'userId', allowNull: false },
    });
    User.Cloth = User.hasMany(models.Cloth, {
      as: 'clothes',
      foreignKey: { name: 'userId', allowNull: false },
    });
    User.Events = User.belongsToMany(models.Event, {
      as: 'events',
      through: 'EventUser',
    });
  };
  return User;
};
