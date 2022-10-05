const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "categories" }
);

module.exports = Category;
