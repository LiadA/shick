module.exports = function buildRecipe(sequelize, DataTypes) {
  const Recipe = sequelize.define('Recipe', {
    dishName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.JSONB,
    },
    process: {
      type: DataTypes.STRING,
    },
  });
  return Recipe;
};
