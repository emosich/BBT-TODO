import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AlertMessage from '../AlertMessage';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalEditProd({handleOpen,open,handleClose, onSubmit, productos}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

  return (
    <div>
      <Button onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
            Edit Product
          </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    id="name"
                    label="name"
                    autoFocus
                    {...register("name",{
                      required: "First name is required.",
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors.name.message : null}
                    />

                <TextField
                    fullWidth
                    id="price"
                    label="price"
                    type='number'
                    autoComplete="prices"
                    {...register("price",{
                        valueAsNumber: true,
                        required: "Price is required.",
                      })}
                    error={!!errors?.price}
                    helperText={errors?.price ? errors.price.message : null}
                    />

                <TextField
                    fullWidth
                    label="Stock"
                    type='number'
                    id="stock"
                    {...register("stock",{
                        valueAsNumber: true,
                        required: "Stock is required.",
                      })}
                    error={!!errors?.stock}
                    helperText={errors?.stock ? errors.stock.message : null}
                    />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Edit
                </Button>                               
            </form>
        </Box>
        </Modal>
        {productos && (
            <AlertMessage
              type={productos}
              message={
                productos === "success"
                  ? `Producto editado`
                  : `Por favor verificar datos ingresados`
              }
            />
          )}
    </div>
  );
}
