import axios from "axios";
import { addItemToCart } from "../store/cart";

export const addToCartItem = (newItem, dispatch, user, cart) => {
  console.log(user);
  const index = cart.findIndex((item) => item.name === newItem.name);

  if (cart[index].stock > cart[index].quantity) {
    if (user.userId) {
      console.log(
        "QUIERO AGREGAR esta cantidad de productos",
        cart[index].quantity
      );

      axios
        .post("http://localhost:3001/api/cart", {
          productId: newItem.productId || newItem.id,
          quantity: cart[index].quantity + 1,
          userId: user.userId,
        })
        .then(() => dispatch(addItemToCart(newItem)));
    } else {
      dispatch(addItemToCart(newItem));
    }
  } else {
    window.alert("Stock superado");
  }
};
