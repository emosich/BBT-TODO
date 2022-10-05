import * as React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
  Container,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const AdminUsers = () => {
  const [checked, setChecked] = React.useState(true);
  const [deleted, setDeleted] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [forDeletion, setForDeletion] = React.useState(false);

  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/admin/${user.id}`)
      .then((res) => setUsers(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, deleted]);

  const handleToggle = (user) => {
    axios
      .put(`http://localhost:3001/api/users/admin/toggle/${user.id}`)
      .then(() => {
        setChecked(!checked);
      });
  };

  const handleRemove = (u) => {
    setForDeletion(u);
    setOpen(true);
  };

  const handleSi = (user) => {
    axios
      .delete(`http://localhost:3001/api/users/admin/${user.id}`)
      .then(() => {
        let index = users.map((u) => u.id).indexOf(user.id);
        setDeleted(users.splice(index, 1));
        setOpen(false);
      });
  };

  const handleNo = () => {
    setOpen(false);
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
        }}
        fixed={true}
      >
        <List
          sx={{ width: "100%", bgcolor: "background.paper", m: 1 }}
          subheader={<ListSubheader>Users:</ListSubheader>}
        >
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${user.lastname}, ${user.name}`}
                secondary={user.email}
              />
              <FormControlLabel
                /* label="Promover/Revocar Admin:"
              labelPlacement="top" */
                control={
                  <Switch
                    edge="end"
                    checked={user.is_admin ? true : false}
                    onChange={() => handleToggle(user)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => handleRemove(user)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Desea eliminar el usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si elimina este usuario la persona se deberá volver a registrar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo}>No</Button>
          <Button
            onClick={() => {
              handleSi(forDeletion);
            }}
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminUsers;
