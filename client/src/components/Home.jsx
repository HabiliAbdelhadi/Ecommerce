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
import CarouselComponent from "./CarouselComponent";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  ];
  const categories = [
    { title: "Lunettes", image: "Lunette.png", query: "lunettes" },
    { title: "Chapeaux", image: "Chapeaux.png", query: "chapeaux" },
    { title: "Bijoux", image: "Bijoux.png", query: "bijoux" },
    { title: "Sacs à main", image: "Sac.png", query: "sacs" },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/produits?featured=true");
        setData(response.data);
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
              sx={{
                borderRadius: "16px",
                color: "black",
                margin: "5px",
                borderWidth: "3px",
                ":hover": {
                  borderWidth: "3px",
                },
              }}
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
          <CarouselComponent carouselItems={carouselItems} />
        </Grid>
      </Grid>
      <br />
      {/* ///////////////////////////////////////////////////////////////////////////// */}
      <Card
        sx={{ background: "white", borderRadius: "23px", width: "100%" }}
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
          sx={{
            background: "white",
            borderRadius: "23px",
            width: "100%",
          }}
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
            <Grid key={index} item xs={12} sm={6} md={3}>
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
                <CardActionArea
                  component={Link}
                  to={`/produits?categorie=${cat.query}`}
                >
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

export default Home;
