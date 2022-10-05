const Product = require("./Product");
const User = require("./User");
const Cart = require("./Cart");
//const Categories = require("./Categories");
const Category = require("./Category");
const Order = require("./Order");
const CartItem = require("./CartItem");
const OrderItem = require("./OrderItem");

Cart.belongsTo(User);
User.hasOne(Cart);

User.hasMany(Order);
Order.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

Product.belongsTo(Category);
Category.hasMany(Product);

/*
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

//Product.hasOne(Categories);
//Categories.belongsTo(Product);
Product.belongsTo(Categories)
Categories.hasMany(Product)

*/

module.exports = { Product, User, Cart, Category, CartItem, OrderItem, Order };

