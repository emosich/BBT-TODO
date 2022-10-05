import {
  createAsyncThunk,
  createReducer,
  createAction,
} from "@reduxjs/toolkit";
// export const addItemToCart = createAsyncThunk("ADD_ITEM_TO_CART", () => {
//   // return axios.get("/api/cart").then((r) => r.data); <- EJEMPLO DE CODIGO
// });
export const addItemToCart = createAction("ADD_TO_CART");
export const removeAllItems = createAction("REMOVE_ALL_ITEMS");
export const removeItem = createAction("REMOVE_ITEM");
export const deleteItem = createAction("DELETE_ITEM");

const cartReducer = createReducer([], {
  [addItemToCart]: (state, action) => {
    const index = state.findIndex((item) => item.name === action.payload.name);

    if (index === -1) {
      state.push(action.payload);
    } else {
      state[index].total += state[index].price;
      state[index].quantity += 1;
    }
    return state;
  },
  [deleteItem]: (state, action) => {
    const estado = [].concat(state);
    const index = state.findIndex((item) => item.name === action.payload.name);

    if (index > -1) {
      estado.splice(index, 1);
      state = estado;
      return state;
    }
  },
  [removeItem]: (state, action) => {
    const index = state.findIndex((item) => item.name === action.payload.name);
    if (index === -1) {
    } else {
      if (state[index].quantity > 1) {
        state[index].total -= state[index].price;
        state[index].quantity -= 1;
      } else {
        state.splice(index, 1);
      }
    }
    return state;
  },
  [removeAllItems]: (state, action) => (state = []),
});

export default cartReducer;
