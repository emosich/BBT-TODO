import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", (data) => {
  return axios
    .post("http://localhost:3001/api/users/login", data,{withCredentials: true,})
    .then((r) => r.data)
    .catch((err) => console.log("Something happened in loginRequest", err));
});

export const sendLogoutRequest = createAsyncThunk("LOGOUT", (cart) => {
  return axios
    .post("http://localhost:3001/api/users/logout", cart)
    .catch((err) => console.log("Something happened in logoutRequest", err));
});

const userReducer = createReducer(
  {},
  {
    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
    [sendLogoutRequest.fulfilled]: (state, action) => (state = {}),
  }
);

export default userReducer;
