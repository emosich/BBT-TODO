import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleViewDetail = (orderId) => {
    navigate(`/user/orders/${orderId}`);
  };

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/api/pastOrders/${user.userId}`,
    }).then((response) => {
      console.log(response);
      setOrders(response.data);
    });
  }, []);

  return (
    <div>
      <h1
        style={{
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Órdenes
      </h1>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TableContainer sx={{ maxWidth: 700 }} component={Paper}>
          <Table sx={{ maxWidth: 700 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Ver Detalle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {order.createdAt.slice(0, 10)}
                  </TableCell>
                  <TableCell align="center">$ {order.totalAmount}</TableCell>
                  <TableCell align="center">
                    <MenuItem onClick={() => handleViewDetail(order.id)}>
                      <VisibilityIcon sx={{ color: blue[700] }} />
                    </MenuItem>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default UserOrders;
