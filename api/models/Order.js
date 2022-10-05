const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Order extends Model {}

Order.init(
  {
    totalAmount: {
      type: DataTypes.INTEGER,
    },
    purchaseDate: {
      type: DataTypes.DATE,
    },
    deliveryDate: {
      type: DataTypes.DATE,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;
