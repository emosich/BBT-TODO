import React from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AlertMessage from "../commons/AlertMessage";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    axios
      .post("http://localhost:3001/api/products", data)
      .then(({ data }) => {
        if (!data.error) {
          setProductos("success");
          navigate(`/product/${data.id}`)
        } else {
          setProductos("error");
          setTimeout(() => setProductos(""), 3000);
          reset();
        }
      })
      .catch(() => navigate("/404"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <SportsBarIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Add Products
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  {...register("name", {
                    required: "First name is required.",
                  })}
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="price"
                  autoComplete="family-name"
                  {...register("price", {
                    required: "Last name is required.",
                  })}
                  error={!!errors?.price}
                  helperText={errors?.price ? errors.price.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  type="stock"
                  id="stock"
                  {...register("stock", {
                    required: "Stock is required.",
                  })}
                  error={!!errors?.stock}
                  helperText={errors?.stock ? errors.stock.message : null}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="categoryName"
                  label="categoryName"
                  autoComplete="categoryName"
                  {...register("categoryName", {
                    required: "categoryName is required.",
                  })}
                  error={!!errors?.categoryName}
                  helperText={errors?.categoryName ? errors.categoryName.message : null}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="description"
                  label="Description"
                  autoComplete="description"
                  {...register("description", {
                    required: "Description is required.",
                  })}
                  error={!!errors?.description}
                  helperText={errors?.description ? errors.description.message : null}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="brand"
                  label="Brand"
                  autoComplete="brand"
                  {...register("brand", {
                    required: "Brand is required.",
                  })}
                  error={!!errors?.brand}
                  helperText={errors?.brand ? errors.brand.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Url"
                  label="Image Url"
                  {...register("images", {
                    required: "Image is required.",
                  })}
                  error={!!errors?.images}
                  helperText={errors?.images ? errors.images.message : null}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </form>
        {productos && (
          <AlertMessage
            type={productos}
            message={
              productos === "success"
                ? `Producto creado`
                : `Por favor verificar datos ingresados`
            }
          />
        )}
      </Box>
    </Container>
  )
}

export default AdminProducts