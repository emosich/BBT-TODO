import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAllItems } from "../store/cart";
import axios from "axios";
import { finalizarCompra } from "../utils/finalizarCombra";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body1,
  padding: theme.spacing(2),
  textAlign: "center",
  fontSize: 30,
  color: theme.palette.text.primary,
  marginTop: 20,
}));

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const totalCart = cart.reduce((acumulador, item) => {
    return acumulador + item.total;
  }, 0);

  const clearCart = async () => {
    if (user.userId) {
      await axios.delete(`http://localhost:3001/api/cart/${user.userId}`);
      dispatch(removeAllItems());
    } else {
      dispatch(removeAllItems());
    }
  };

  return (
    <div>
      <h1
        style={{
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Mi carrito
      </h1>
      {cart.length > 0
        ? cart.map((product, i) => {
            return <CartItem key={i} product={product} />;
          })
        : "No hay productos en el carrito"}
      <Box sx={{ width: "100%" }}>
        <Stack spacing={20}>
          <Item>{`TOTAL $ ${totalCart}`}</Item>
        </Stack>
      </Box>
      <Box display="flex" justifyContent="center" margin>
        <Button
          variant="contained"
          onClick={() => {
            finalizarCompra(user, dispatch, navigate);
          }}
        >
          Finalizar compra
        </Button>
        <Link to="/">
          <Button variant="outlined">Seguir comprando</Button>
        </Link>
        <Button variant="outlined" onClick={clearCart}>
          Limpiar carrito
        </Button>
      </Box>
    </div>
  );
};

export default Cart;
