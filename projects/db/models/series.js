const { sourceOptions, seriesTypeOptions, rankOptions } = require('../enums.json');

module.exports = function buildCloth(sequelize, DataTypes) {
  const Series = sequelize.define('Series', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    source: {
      type: DataTypes.ENUM(...sourceOptions),
      allowNull: false,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...seriesTypeOptions)),
      allowNull: false,
    },
    rank: {
      type: DataTypes.ENUM(...rankOptions),
      allowNull: false,
    },
  });

  Series.associate = models => {
    Series.User = Series.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId', allowNull: false },
    });
  };
  return Series;
};
