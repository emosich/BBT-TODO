import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../utils/addToCart";
import { Box } from "@mui/material";

const GridItem = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const addItemToCart = () => {
    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      total: product.price,
      img: product.images,
      description: product.description,
      stock: product.stock,
    };
    console.log(newItem);
    addToCart(newItem, dispatch, user);
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        ":hover": {
          boxShadow: 10,
        },
      }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="250"
          image={product.images}
          alt="green iguana"
        />
        <hr border="none" border-top="1px" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            $ {product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description.slice(0, 50) + "..."}
          </Typography>
        </CardContent>
      </Link>
      <Link to="/cart">
        <Box display="flex" justifyContent="right" margin >
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={addItemToCart}
        ></Button>
        </Box>
      </Link>
    </Card>
  );
};

export default GridItem;
