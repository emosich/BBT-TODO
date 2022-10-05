import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import SingleProductView from "./components/SingleProduct";
import { Routes, Route } from "react-router-dom";
import Grid from "./components/Grid";
import Cart from "./pages/Cart";
import CartItem from "./components/CartItem";
import Register from "./pages/Register";
import AdminProducts from "./components/AdminProducts";
import AdminUsers from "./components/AdminUsers";
import AdmEditeDeleteProd from "./components/AdmEditeDeleteProd";
import AdminCategories from "./components/AdminCategories";
import axios from "axios";
import UserOrders from "./components/UserOrders";
import OrderDetail from "./components/OrderDetail";

function App() {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/category`).then((res) => {
      setCategoriesList(res.data);
    });
  }, []);

  function getCategoryRoutes() {
    let categoryRoutes = categoriesList.map((categoryListItem) => (
      <Route
        key={categoryListItem.id}
        path={`/${categoryListItem.name.toLocaleLowerCase()}`}
        element={<Grid category={categoryListItem.name} />}
      ></Route>
    ));
    return categoryRoutes;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Grid category="none" />} />
        {getCategoryRoutes()}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<SingleProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/products/edit" element={<AdmEditeDeleteProd />} />
        <Route path="/admin/category" element={<AdminCategories />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/user/orders/:id" element={<OrderDetail />} />
      </Routes>
    </div>
  );
}

export default App;
