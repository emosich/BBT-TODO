import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const GetItemHtml = (product) => {
  return (
    <Paper
      key={product.id}
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
            <Img alt="foto producto" src={`${product.images}`} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ margin: 2 }}>
            <Typography variant="subtitle1" component="div">
              Precio unitario: $ {product.price}
              <br />
              Cantidad: {product.order_item.quantity}
              <br />
              Precio total: $ {product.price * product.order_item.quantity}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/api/pastOrders/detail/${id}`,
    }).then((response) => {
      setOrder(response.data);
    });
  }, [id]);

  return (
    <div>
      <h1
        style={{
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Detalle de la orden
      </h1>
      {order.products ? (
        <>
          {order.products.map((product, i) => {
            return GetItemHtml(product);
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderDetail;
