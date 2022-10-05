const express = require("express");
const cart = express.Router();
const { Product, Cart, CartItem } = require("../models");

// Route to display the cart
cart.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  let cart = await Cart.findOne({
    where: { userId },
    include: {
      model: Product,
    },
  });
  if (cart) {
    let result = cart.products.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.images,
        quantity: item.cart_item.quantity,
      };
    });
    res.send(result);
  } else {
    res.sendStatus(204);
  }
});

// Route to create a cart, add a new cart item or edit the quantity of an existing one.
cart.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (quantity <= 0) {
    return res.status(400).send("The quantity must be higher than zero.");
  }

  let cart = await Cart.findOrCreate({ where: { userId } });

  let product = await CartItem.findOne({
    where: { cartId: cart[0].id, productId },
  });

  if (product === null) {
    CartItem.create({ cartId: cart[0].id, productId, quantity });
  } else {
    CartItem.update(
      { quantity: quantity },
      { where: { cartId: cart[0].id, productId } }
    );
  }
  res.sendStatus(200);
});


//Si hay productos en el carrito quiero tenerlos en la db del usuario
cart.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (req.body.length > 0) {
    req.body.forEach(async ({ productId, quantity }) => {
      let cart = await Cart.findOrCreate({ where: { userId } });

      let product = await CartItem.findOne({
        where: { cartId: cart[0].id, productId },
      });
      if (product === null) {
        CartItem.create({ cartId: cart[0].id, productId, quantity });
      } else {
        CartItem.update(
          { quantity: quantity },
          { where: { cartId: cart[0].id, productId } }
        );
      }
    })
    res.sendStatus(201);
  }
});

// Route to delete cartItems and to delete the cart if it has no remaining cartItems.
cart.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  let cart = await Cart.findOne({ where: { userId } });
  await CartItem.destroy({ where: { cartId: cart.id, productId } });

  let cartItemCount = await CartItem.count({ where: { cartId: cart.id } });

  if (cartItemCount === 0) {
    await Cart.destroy({ where: { id: cart.id } });
  }

  res.sendStatus(200);
});

//Route to delete the whole cart (this will asl delete its cart items)
cart.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  await Cart.destroy({ where: { userId } });
  res.sendStatus(200);
});
module.exports = cart;
