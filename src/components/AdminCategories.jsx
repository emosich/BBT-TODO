import axios from "axios";
import React, { useEffect, useState } from "react";
//import AddEditCategory from "./AddEditCategory";
import AddCategoryModal from "../commons/Modals/AddCategoryModal";
import EditCategoryModal from "../commons/Modals/EditCategoryModal";

import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListSubheader, ListItemIcon, Button } from "@mui/material";
import LiquorIcon from "@mui/icons-material/Liquor";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [deleted, setDeleted] = React.useState([]);
  const [added, setAdded] = React.useState({});
  const [modified, setModified] = React.useState({});
  const [category, setCategory] = React.useState({});

  //Cosas del Modal: -------------------------------

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const onSubmitAdd = (data) => {
    axios.post(`http://localhost:3001/api/category`, data).then((result) => {
      setAdded(result.data);
      setOpenAdd(false);
    });
  };

  const onSubmitEdit = (data) => {
    axios
      .put(`http://localhost:3001/api/category/${category.id}`, data)
      .then((result) => {
        setModified(result.data);
        setOpenEdit(false);
      });
  };

  //------------------------------------------------

  useEffect(() => {
    axios.get(`http://localhost:3001/api/category`).then((res) => {
      setCategories(res.data);
    });
  }, [deleted, added, modified]);

  const handleEdit = (cat) => {
    setCategory(cat);
    setOpenEdit(true);
  };

  //console.log("CATEGORY EN EL ESTADO LOCAL DE REDUX", category)

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleDelete = (cat) => {
    axios.delete(`http://localhost:3001/api/category/${cat.id}`).then(() => {
      let index = categories.map((c) => c.id).indexOf(cat.id);
      setDeleted(categories.splice(index, 1));
    });
  };

  return (
    <>
      <Container
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "80%",
            lg: "60%",
            xl: "40%",
          },
          mb: 10,
        }}
        fixed={true}
      >
        <List
          sx={{ width: "100%", bgcolor: "background.paper", m: 1 }}
          subheader={<ListSubheader>Categorias:</ListSubheader>}
        >
          {categories.map((cat) => {
            return (
              <ListItem key={cat.id}>
                <ListItemIcon>
                  <LiquorIcon />
                </ListItemIcon>
                <ListItemText primary={cat.name} />
                <IconButton aria-label="edit" onClick={() => handleEdit(cat)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(cat)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
        <Button
          edge="end"
          variant="outlined"
          startIcon={<AddBoxIcon />}
          onClick={handleAdd}
        >
          Agregar Categoría
        </Button>
      </Container>
      <AddCategoryModal
        open={openAdd}
        handleClose={handleCloseAdd}
        onSubmit={onSubmitAdd}
      />
      <EditCategoryModal
        open={openEdit}
        handleClose={handleCloseEdit}
        onSubmit={onSubmitEdit}
        name={category.name}
      />
    </>
  );
};

export default AdminCategories;
