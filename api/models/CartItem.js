const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class CartItem extends Model {}

CartItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
    },
  },

  { sequelize: db, modelName: "cart_item" }
);




module.exports = CartItem;
