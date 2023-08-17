import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        marginTop: "72px",
        backgroundColor: " #333333",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Typography variant="h5" gutterBottom color="#fed540">
              LuxMerch
            </Typography>
            <Typography variant="body2" color="white">
              Élevez chaque instant avec nos accessoires d'une élégance exquise.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: { xs: "none", md: "block" } }}
            textAlign="center"
          >
            <Typography variant="h6" gutterBottom color="#fed540">
              Liens Rapides
            </Typography>
            <Typography
              as={Link}
              to="/"
              sx={{ textDecoration: "none", color: "white" }}
            >
              Home
            </Typography>
            <br />
            <Typography
              as={Link}
              to="/produit"
              sx={{ textDecoration: "none", color: "white" }}
            >
              Produits
            </Typography>
            <br />
            <Typography
              as={Link}
              to="/contact"
              sx={{ textDecoration: "none", color: "white" }}
            >
              Contactez nous
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Typography variant="h6" color="#fed540">
              Contactez nous
            </Typography>
            <Typography color="white">Email: info@example.com</Typography>
            <Typography color="white">Phone: (123) 456-7890</Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
