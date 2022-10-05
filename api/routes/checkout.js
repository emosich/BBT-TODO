const express = require("express");
const router = express.Router();
const transporter = require("../config/mailer");
const contentEmail = require("../helper/contentEmail");
const {
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  User,
} = require("../models");

router.post("/:userId", async (req, res) => {
  let totalAmount = 0;

  const { userId } = req.params;

  let cart = await Cart.findOne({
    where: { userId },
    include: [{ model: Product }, { model: User }],
  });

  if (!cart) {
    res
      .status(400)
      .send("No se puede ejecutar la compra, no hay items en el carrito");
    return;
  }

  cart.products.forEach((product) => {
    totalAmount += product.price * product.cart_item.quantity;
  });

  let order = await Order.create({
    userId,
    totalAmount,
  });

  let cartItems = cart.products.map((product) => {
    return {
      productId: product.id,
      orderId: order.id,
      stock: product.stock,
      name: product.name,
      price: product.price,
      image: product.images,
      quantity: product.cart_item.quantity,
    };
  });

  await OrderItem.bulkCreate(cartItems);

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];

    let newStock = item.stock - item.quantity;

    await Product.update(
      { stock: newStock },
      {
        where: {
          id: item.productId,
        },
      }
    );
  }

  await Cart.destroy({
    where: {
      userId,
    },
  });

  try {
    await transporter.sendMail({
      from: '"BBT Bebidas" <bbtbedidas@gmail.com>',
      to: `${cart.user.email}`,
      subject: "Orden registrada",
      html: `
      <h1>Hola, ${cart.user.name}</h1>
      <h2>Tu orden ha sido registrada con los siguientes productos:</h2>
      ${contentEmail(cartItems)}
      <h1>PRECIO TOTAL: $${totalAmount}</h1>
      `,
    });
  } catch (error) {
    emailStatus = error;
    console.log(emailStatus);
  }

  res.status(201).send({ order, cartItems });
});

module.exports = router;
