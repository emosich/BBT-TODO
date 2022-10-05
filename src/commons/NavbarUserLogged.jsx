import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendLogoutRequest } from "../store/user";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import { deepOrange } from "@mui/material/colors";
import { Menu } from "@mui/material";

const NavbarUserLogged = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutNavbar = () => {
    dispatch(sendLogoutRequest());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleCartNavbar = () => {
    navigate("/cart");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleManageUsers = () => {
    //Lleva al componente que organiza los usuarios.
    setAnchorEl(null);
    navigate("/admin/users");
  };

  const handleManageProducts = () => {
    //Lleva al componente para Agregar o Editar un producto
    setAnchorEl(null);
    navigate("/admin/products");
  };

  const handleManageProductsEdit = () => {
    //Lleva al componente para Agregar o Editar un producto
    setAnchorEl(null);
    navigate("/admin/products/edit");
  };

  const handleManageCategories = () => {
    //Lleva al componente para Agregar o Editar un producto
    setAnchorEl(null);
    navigate("/admin/category");
  };

  const handleOrders = () => {
    //Lleva al componente para que el usuario vea su historial de compras.
    setAnchorEl(null);
    navigate("/user/orders");
  };

  return (
    <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
      <MenuItem onClick={handleMenu}>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.name[0]}</Avatar>
      </MenuItem>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user.is_admin ? (
          <div>
            {" "}
            <MenuItem onClick={handleManageUsers}>Usuarios</MenuItem>
            <MenuItem onClick={handleManageProducts}>Productos</MenuItem>
            <MenuItem onClick={handleManageProductsEdit}>Editar/Eliminar</MenuItem>
            <MenuItem onClick={handleManageCategories}>
              Categorías
            </MenuItem>{" "}
          </div>
        ) : (
          <MenuItem onClick={handleOrders}>Orders</MenuItem>
        )}
      </Menu>
      <MenuItem
        onClick={handleCartNavbar}
        style={{ textDecoration: "none", color: "white" }}
      >
        <ShoppingCartIcon />
      </MenuItem>

      <MenuItem onClick={handleLogoutNavbar}>
        <Typography textAlign="center">Salir</Typography>
      </MenuItem>
    </Box>
  );
};

export default NavbarUserLogged;
