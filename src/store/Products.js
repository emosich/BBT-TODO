import axios from "axios";
import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const productsRequest = createAsyncThunk("Products", (setProducts) => {
  return axios.get('http://localhost:3001/api/products')
  .then((res)=> setProducts(res.data))
  .catch(error=> console.log(error));  
});



const ProductsReducer = createReducer({}, {
    [productsRequest.fulfilled]: (state, action) => action.payload,
  });
  
  export default ProductsReducer;