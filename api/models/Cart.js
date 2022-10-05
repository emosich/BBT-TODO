const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Cart extends Model {
  handleStock(productId) {
    return this.products.find((product) => product.id === productId);
  }
}

Cart.init(
  {
    /*
    product_amount: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    shipment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    shipment_address: {
      type: DataTypes.STRING,
    },
    */
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
