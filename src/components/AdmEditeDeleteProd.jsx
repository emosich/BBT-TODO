import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { productsRequest } from "../store/Products";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {MenuItem} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import ModalEditProd from "../commons/Modals/ModalEditProd";


export default function AdmEditeDeleteProd() {
  const [products, setProducts] = React.useState([]);
  const [productos, setProductos] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [indiv, setIndiv] = React.useState({})
  

  const handleOpen = (row) => (setOpen(true), setIndiv(row));
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  

  React.useEffect(() => {
    dispatch(productsRequest(setProducts));
  }, []);

  function createData(id,name,price,stock,categoryId,description,brand,images) {
    return { id, name, price, stock, categoryId, description, brand, images };
  }

  const rows = products.map((producto, i) =>
    createData(producto.id,producto.name,producto.price,producto.stock,producto.categoryId,producto.description,producto.brand,producto.images)
  );

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/products/${id}`)
      .then((res) => res.data)
      .then(() => dispatch(productsRequest(setProducts)))
      .catch((error) => console.log(error));
  };

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:3001/api/products/${indiv.id}`, data)
      .then(({ data }) => {
        if (!data.error) {
          setProductos("success");
          
        } else {
          setProductos("error");
          setTimeout(() => setProductos(""), 1000);
        }
      })
      .then(() => {
        dispatch(productsRequest(setProducts))
        setOpen(false)
      })
      .catch(() =>console.log('hubo un error'));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Stock&nbsp;</TableCell>
              <TableCell align="center">Categoría&nbsp;</TableCell>
              <TableCell align="center">Descripción&nbsp;</TableCell>
              <TableCell align="center">Marca&nbsp;</TableCell>
              <TableCell align="center">Imagen&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.stock}</TableCell>
                <TableCell align="center">{row.categoryId}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">
                  <img src={`${row.images}`} style={{ maxHeight: 150 }} />
                </TableCell>
                <TableCell align="center">
                  <MenuItem onClick={() => handleOpen(row)}>
                    <BorderColorIcon color="primary" />
                  </MenuItem>
                </TableCell>
                <TableCell align="center">
                  <MenuItem onClick={() => handleDelete(row.id)}>
                    <DeleteIcon sx={{ color: red[700] }} />{" "}
                  </MenuItem>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalEditProd open={open} handleClose={handleClose} onSubmit={onSubmit} indiv={indiv} productos={productos} />
    </>
  );
}
