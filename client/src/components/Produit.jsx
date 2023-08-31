import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActionArea,
  CardActions,
  CircularProgress,
  Box,
  Container,
  Paper,
} from "@mui/material";
import CarouselComponent from "./CarouselComponent";

const Produit = () => {
  const productId = useParams().id;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/produits/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const carouselItems = product?.pictures.map((picture, index) => ({
    image: [`http://localhost:8000/${picture.replace("public\\", "")}`],
    caption: picture,
  }));

  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container
      sx={{
        maxWidth: { lg: "65vw", md: "75vw", sm: "85vw", xs: "95vw" },
        my: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: "10px",
        }}
      >
        <Grid container spacing={1} p={1}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card>
              <CarouselComponent carouselItems={carouselItems} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid container direction="column" height="100%">
              <Grid item xs>
                <Typography typography={{ xs: "h4", sm: "h3" }} align="center">
                  {product.nom}
                </Typography>
                {product.marque ? (
                  <Typography variant="h6" gutterBottom>
                    Marque :{" "}
                    <span style={{ fontWeight: "bold" }}>{product.marque}</span>
                  </Typography>
                ) : null}
                <Typography>{product.desc}</Typography>
              </Grid>
              <Grid
                item
                xs
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  typography={{ xs: "h6", sm: "h5" }}
                  sx={{ textAlign: { xs: "center", sm: "right" } }}
                  gutterBottom
                >
                  <span
                    style={{
                      color: "#de7c11",
                      marginRight: "1px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.prix}
                  </span>
                  <span style={{ color: "black" }}>DZD</span>
                </Typography>
                <Button
                  variant="contained"
                  color="yellowgreen"
                  sx={{
                    fontSize: "small",
                    color: "black",
                    bgcolor: "yellowgreen",
                    borderRadius: "16px",
                    size: "small",
                  }}
                  endIcon={<AddShoppingCartIcon />}
                >
                  Ajouter au panier
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Produit;
