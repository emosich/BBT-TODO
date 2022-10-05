import * as React from "react";
import { useForm, Controller } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import { Input, InputLabel, FormHelperText, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 240,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, onSubmit }) {
  const { control, handleSubmit, register } = useForm();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={() => (
                  <>
                    <InputLabel htmlFor="my-input">
                      Nombre de la categoría
                    </InputLabel>
                    <Input
                      {...register("name", { required: "Ingrese un nombre" })}
                      id="name-input"
                      aria-describedby="my-helper-text"
                    />
                    <FormHelperText id="my-helper-text">
                      Ingrese un nombre para la categoría
                    </FormHelperText>
                  </>
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
