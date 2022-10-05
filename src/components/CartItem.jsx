import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./CartItem.module.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import { removeItem, deleteItem } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCartItem } from "../utils/addToCartItem";
import Alert from "@mui/material/Alert";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CartItem({ product }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addItemToCart = (product) => {
    const newItem = {
      productId: product.id || product.productId,
      name: product.name,
      price: product.price,
      quantity: 1,
      total: product.price,
      img: product.images,
      description: product.description,
    };
    addToCartItem(newItem, dispatch, user, cart);
  };

  const removeOneItem = () => {
    const { img, name, price, productId, stock, total, description } = product;

    if (product.quantity === 1) {
      deleteCartItem();
    } else {
      if (user.userId) {
        axios.post("http://localhost:3001/api/cart", {
          img,
          name,
          price,
          productId,
          quantity: product.quantity - 1,
          stock,
          total,
          description,
          userId: user.userId,
        });
        dispatch(removeItem(product));
      }
    }
  };

  const deleteCartItem = () => {
    if (user.userId) {
      axios.delete(
        `http://localhost:3001/api/cart/${user.userId}/${product.productId}`
      );
      dispatch(deleteItem(product));
    } else {
      dispatch(deleteItem(product));
    }
  };
  const buttons = [
    <Button key="one" onClick={removeOneItem}>
      -
    </Button>,
    <Button key="two">{product.quantity}</Button>,
    <Button
      key="three"
      onClick={() => {
        addItemToCart(product, cart, dispatch, user);
      }}
    >
      +
    </Button>,
  ];

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        marginTop: 3,
        maxWidth: 700,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="foto producto" src={`${product.img}`} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description.slice(0, 80)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{ cursor: "pointer" }}
                variant="body2"
                onClick={deleteCartItem}
              >
                Eliminar
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Precio unitario.....$ {product.price}
              <br />
              <br />
              Precio...................${product.total}
            </Typography>
            <Box
              sx={{ minWidth: 10, maxWidth: 50 }}
              className={styles.cantidad}
            >
              <Typography variant="body2" color="text.secondary">
                Cantidad
              </Typography>
              <ButtonGroup size="small" aria-label="small button group">
                {buttons}
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
