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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AlertMessage from "../commons/AlertMessage";

const Register = () => {
  const navigate = useNavigate();
  const [registerStatus, setRegisterStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/users/register", data)
      .then(({ data }) => {
        if (!data.error) {
          setRegisterStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setRegisterStatus("error");
          setTimeout(() => setRegisterStatus(""), 3000);
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
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Registro
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  label="First Name"
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
                  label="Last Name"
                  autoComplete="family-name"
                  {...register("lastname", {
                    required: "Last name is required.",
                  })}
                  error={!!errors?.lastname}
                  helperText={errors?.lastname ? errors.lastname.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "E-mail no válido",
                    },
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  id="date"
                  {...register("date_of_birth", {
                    required: "Date of birth is required.",
                  })}
                  error={!!errors?.date_of_birth}
                  helperText={
                    errors?.date_of_birth
                      ? errors.date_of_birth.message
                      : "Date of birth"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="adress"
                  label="Full Adress"
                  {...register("adress", {
                    required: "Adress is required.",
                  })}
                  error={!!errors?.adress}
                  helperText={errors?.adress ? errors.adress.message : null}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </form>
        {registerStatus && (
          <AlertMessage
            type={registerStatus}
            message={
              registerStatus === "success"
                ? `Cuenta creada`
                : `Por favor verificar datos ingresados`
            }
          />
        )}
      </Box>
    </Container>
  );
};

export default Register;
