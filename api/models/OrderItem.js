const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class OrderItem extends Model {}

OrderItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
    },
  },

  { sequelize: db, modelName: "order_item" }
);

module.exports = OrderItem;