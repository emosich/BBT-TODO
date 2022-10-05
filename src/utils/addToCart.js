import axios from "axios";
import { addItemToCart } from "../store/cart";

export const addToCart = (newItem, dispatch, user, cart) => {

  if (user.userId) {
    axios
      .post("http://localhost:3001/api/cart", {
        productId: newItem.productId || newItem.id,
        quantity: newItem.quantity,
        userId: user.userId,
      })
      .then(() => dispatch(addItemToCart(newItem)));
  } else {
    dispatch(addItemToCart(newItem));
  }
  
};
