import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
} from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const Home = () => {
  const carouselItems = [
    {
      image: "Acc2.png",
      caption: "High-End Accessories Collection",
    },
    {
      image: "Mwader.png",
      caption: "Mwader 9ouwa",
    },
    {
      image: "Acc.png",
      caption: "High-End Accessories Collection",
    },
    // Add more carousel items as needed
  ];
  const categories = [
    { title: "Lunettes", image: "Lunette.png" },
    { title: "Chapeaux", image: "Chapeaux.png" },
    { title: "Bijoux", image: "Bijoux.png" },
    { title: "Sacs à main", image: "Sac.png" },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/produits?featured=true");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ typography: { sm: "h2", xs: "h3" } }}
            color="#93370a"
            gutterBottom
          >
            Accessoires haut de gamme
          </Typography>
          <Typography variant="subtitle1">
            Découvrez une large gamme d'accessoires luxueux soigneusement
            sélectionnés pour les clients les plus exigeants. Rehaussez votre
            style avec notre collection haut de gamme de produits.
          </Typography>
          <Box
            display="flex"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-around",
            }}
          >
            <Button
              component={Link}
              to="/produits"
              variant="contained"
              color="yellowgreen"
              sx={{ borderRadius: "16px", margin: "5px" }}
            >
              Découvrir nos produits
            </Button>
            <Button
              variant="outlined"
              color="yellowgreen"
              sx={{ borderRadius: "16px", color: "black", margin: "5px" }}
              endIcon={<KeyboardDoubleArrowDownIcon />}
              onClick={() => {
                window.scrollTo({
                  top: document.getElementById("categories").offsetTop - 50,
                  behavior: "smooth",
                });
              }}
            >
              Explorez plus
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Carousel autoPlay interval={5000} sx={{ width: "100%" }}>
            {carouselItems.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </Carousel>
        </Grid>
      </Grid>
      <br />
      {/* ///////////////////////////////////////////////////////////////////////////// */}
      <Card
        sx={{ background: "lightgrey", borderRadius: "10px", width: "100%" }}
        elevation={4}
      >
        <Divider maxWidth="100vw">
          <Typography
            align="center"
            sx={{ typography: { xs: "h4", sm: "h3" } }}
            color="#93370a"
          >
            Produit Tendance
          </Typography>
        </Divider>
      </Card>

      <ProductCard data={data.produits} />

      {/* ///////////////////////////////////////////////////////////////////////////// */}
      <br />
      <Container
        id="categories"
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", allignItems: "center" }}
      >
        <Card
          sx={{ background: "lightgrey", borderRadius: "10px", width: "100%" }}
          elevation={4}
        >
          <Divider maxWidth="100vw">
            <Typography
              align="center"
              sx={{ typography: { xs: "h4", sm: "h3" } }}
              color="#93370a"
            >
              Categories
            </Typography>
          </Divider>
        </Card>
        <Grid container spacing={2} mt={1}>
          {categories.map((cat, index) => (
            <Grid key={index} item xs={12} md={6} lg={3}>
              <Card
                variant="outlined"
                key={index}
                sx={{
                  borderRadius: "16px",
                  ":hover": {
                    boxShadow: 16,
                  },
                }}
              >
                <CardActionArea component={Link} to="/produits">
                  <CardMedia
                    sx={{
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    image={`${cat.image}`}
                    title={`${cat.title}`}
                  >
                    <Box
                      sx={{
                        backgroundColor: "rgba(64, 64, 64, 0.6)",
                        padding: "8px",
                        borderRadius: "16px",
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold" color="white">
                        {cat.title}
                      </Typography>
                    </Box>
                  </CardMedia>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

const Item = ({ item }) => {
  return (
    <img
      src={item.image}
      alt={item.caption}
      style={{
        objectFit: "cover",
        width: "100%",
        borderRadius: "16px",
      }}
    />
  );
};

export default Home;
