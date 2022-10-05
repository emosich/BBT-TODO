import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utils/addToCart";
import Alert from "@mui/material/Alert";
export default function SingleProductView() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/single/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const addItemToCart = () => {
    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      total: product.price,
      img: product.images,
      description: product.description,
    };
    const index = cart.findIndex((item) => item.name === newItem.name);

    if (index === -1) {
      addToCart(newItem, dispatch, user);
    } else {
      if (product.stock > cart[index].quantity)
        addToCart(newItem, dispatch, user);
    }
  };

  return !product.id ? (
    <Typography variant="h1" gutterBottom>
      Cargando...
    </Typography>
  ) : (
    <>
      <Grid
        container
        spacing={1}
        columns={16}
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={5}
        // border={5}
        // borderColor={"blue"}
      >
        <Grid
          item
          xs={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          // border={5}
          // borderColor={"red"}
        >
          {/* Aqui mostramos la foto del producto */}
          <Box sx={{ bgcolor: "white", height: "500" }}>
            <img alt="Producto foto" src={`${product.images}`} height={"500"} />
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    {product.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6" component="div">
                    {`$${product.price}`}
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                {product.description}
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                Categorias
              </Typography>

              {/* Aca donde muestro las categorias no puedo mostrar nada por que el JSON del producto no tiene categorias asignadas.  */}
              <Stack direction="row" spacing={1}>
                <Chip label="Cat Uno" />
                <Chip label="Cat Dos" />
                <Chip label="Cat Tres" />
                <Chip label="Cat Cuatro" />
              </Stack>

              <Typography mt={2} gutterBottom variant="body1">
                Cantidad
              </Typography>
              <Chip label={`${product.stock}`} />
            </Box>
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                onClick={addItemToCart}
              >
                Agregar al carrito
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
