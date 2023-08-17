import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "white", borderRadius: "16px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          >
            <img src="LogoSmall.png" alt="Logo" style={{ Height: "2px" }} />
          </IconButton>
          {/*this is for big screens*/}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            LuxMerch{/*this is for big screens*/}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/*this is for small screens*/}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
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
              <MenuItem
                key={1}
                onClick={handleCloseNavMenu}
                sx={{ background: "yellowgreen", borderRadius: "12px" }}
                component={Link}
                to="/produits"
              >
                <Typography
                  variant="h6"
                  sx={{ color: "black" }}
                  textAlign="center"
                >
                  Produits
                </Typography>
              </MenuItem>
              <MenuItem
                key={2}
                onClick={handleCloseNavMenu}
                component={Link}
                to="/contact"
              >
                <Typography sx={{ color: "black" }} textAlign="center">
                  Contact
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <IconButton
            component={Link}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
          >
            <img src="LogoSmall.png" alt="Logo" style={{ Height: "2px" }} />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            LuxMerch
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/produit"
              variant="contained"
              color="yellowgreen"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                marginRight: "3px",
                color: "black",
                display: "block",
                bgcolor: "yellowgreen",
                borderRadius: "16px",
              }}
            >
              Produits
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              color="yellowgreen"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                marginLeft: "3px",
                color: "black",
                display: "block",
                borderRadius: "16px",
              }}
            >
              Contact
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Panier">
              <IconButton
                component={Link}
                to="/panier"
                variant="contained"
                color="secondary"
                sx={{
                  width: "5px",
                  height: "5px",
                }}
              >
                <ShoppingCartIcon color="success" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
