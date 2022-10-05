import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { sendLogoutRequest } from "../store/user";
import NavbarUserLogged from "../commons/NavbarUserLogged";
import CssBaseline from '@mui/material/CssBaseline';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [categoriesList, setCategoriesList] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3001/api/category`).then((res) => {
      setCategoriesList(res.data);
    });
  }, []);

  function getCategoryPages() {
    let categories = [];
    categoriesList.forEach((element) => {
      categories.push({
        page: element.name,
        onClickHandler: function () {
          handleCloseCategories();
          handleCloseNavMenu();
          navigate(`/${element.name.toLocaleLowerCase()}`);
        },
      });
    });
    return categories;
  }

  /*** Start Hamburger Menu functionality ***/
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  /*** End Hamburger Menu functionality ***/

  /*** Start Dropdown categories functionality ***/
  const [anchorCategoriesDropDown, setAnchorCategoriesDropDown] =
    React.useState(null);
  const openCategoriesDropDown = Boolean(anchorCategoriesDropDown);
  const handleClickCategories = (event) => {
    setAnchorCategoriesDropDown(event.currentTarget);
  };
  const handleCloseCategories = () => {
    setAnchorCategoriesDropDown(null);
  };
  /*** End Dropdown categories functionality ***/

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <CssBaseline/>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BBT-TODO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {getCategoryPages().map((item) => (
                <MenuItem key={item.page} onClick={item.onClickHandler}>
                  <Typography textAlign="center">{item.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BBT-TODO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              id="basic-button"
              aria-controls={openCategoriesDropDown ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openCategoriesDropDown ? "true" : undefined}
              onClick={handleClickCategories}
              style={{ color: "white" }}
            >
              Categorías
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorCategoriesDropDown}
              open={openCategoriesDropDown}
              onClose={handleCloseCategories}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {getCategoryPages().map((item) => (
                <MenuItem key={item.page} onClick={item.onClickHandler}>
                  <Typography textAlign="center">{item.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {user.name ? (
            <NavbarUserLogged user={user} />
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
              <MenuItem>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </Link>
              </MenuItem>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
