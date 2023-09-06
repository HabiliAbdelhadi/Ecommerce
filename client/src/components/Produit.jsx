import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Button,
  Grid,
  Typography,
  ButtonGroup,
  CircularProgress,
  Box,
  Container,
  Paper,
} from "@mui/material";
import CarouselComponent from "./CarouselComponent";

const Produit = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [qte, setQte] = useState(0);

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
        display: "flex",
        marginTop: "12px",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: "10px",

          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
        }}
      >
        <Grid container spacing={1} p={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Paper
              variant="outlined"
              sx={{
                borderColor: "#93370a",
                borderRadius: "10px",
                borderWidth: "1px",
              }}
            >
              <CarouselComponent carouselItems={carouselItems} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container direction="column" height="100%">
              <Grid item xs>
                <Typography typography={{ xs: "h5", sm: "h4" }} align="center">
                  {product.nom}
                </Typography>
                {product.marque ? (
                  <Typography variant="h6" gutterBottom>
                    Marque :
                    <span style={{ fontWeight: "bold" }}>
                      {" " + product.marque}
                    </span>
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <ButtonGroup variant="outlined" color="bri">
                    <Button
                      disabled={qte <= 0}
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        borderRadius: "16px",
                      }}
                      onClick={() => {
                        setQte((prevQte) => {
                          return prevQte - 1;
                        });
                      }}
                    >
                      -
                    </Button>
                    <Button
                      sx={{ color: "black", fontWeight: "bold" }}
                      variant="contained"
                      disableElevation
                      disableTouchRipple
                    >
                      {qte || 0}
                    </Button>
                    <Button
                      disabled={qte >= product.qnt}
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        borderRadius: "16px",
                      }}
                      onClick={() => {
                        setQte((prevQte) => {
                          return prevQte + 1;
                        });
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                  <Typography
                    typography={{ xs: "h6", sm: "h5" }}
                    sx={{ textAlign: "center" }}
                  >
                    <span
                      style={{
                        color: "#de7c11",
                        marginRight: "1px",
                        fontWeight: "bold",
                      }}
                    >
                      {product.prix * qte || product.prix}
                    </span>
                    <span style={{ color: "black" }}>DZD</span>
                  </Typography>
                </Box>
                <Button
                  disabled={!qte}
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
