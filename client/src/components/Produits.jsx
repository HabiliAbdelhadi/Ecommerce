import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  Box,
  Grid,
  Container,
  Typography,
  Divider,
  Card,
  Button,
  Drawer,
  TextField,
  InputAdornment,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";

const Produits = () => {
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get("/produits?featured=true");
        setData1(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData1();
  }, []);

  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get("/produits");
        setData2(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData2();
  }, []);

  const [drawer, setDrawer] = useState(false);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        mt: 2,
      }}
    >
      <Card
        sx={{ background: "lightgrey", borderRadius: "10px", width: "100%" }}
        elevation={4}
      >
        <Divider maxWidth="100vw">
          <Typography align="center" variant="h5" color="#93370a">
            Produit Tendance
          </Typography>
        </Divider>
      </Card>

      <ProductCard data={data1.produits} />
      <br />
      <Card
        sx={{
          background: "lightgrey",
          borderRadius: "10px",
          width: "100%",
        }}
        elevation={4}
      >
        <Divider maxWidth="100vw">
          <Typography align="center" variant="h5" color="#93370a">
            Tous les Produits
          </Typography>
        </Divider>
        <Typography textAlign="center" gutterBottom>
          Plongez dans notre incroyable sélection d'accessoires qui ajoutent une
          touche de style et d'enthousiasme à votre look !
        </Typography>

        <Grid container spacing={1} sx={{ mb: 1, justifyContent: "center" }}>
          <Grid item xs={12} sm={8} md={9} lg={9}>
            <TextField
              label="recherche"
              type="search"
              size="small"
              id="search"
              sx={{
                display: "flex",
                mx: 1,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            lg={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              endIcon={<FilterAltIcon />}
              variant="contained"
              color="othercolor"
              sx={{ color: "white", borderRadius: "12px" }}
              onClick={() => {
                setDrawer(true);
              }}
            >
              Filtres
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Drawer
        anchor="left"
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
      >
        cc
      </Drawer>
      <ProductCard data={data2.produits} />
    </Container>
  );
};

export default Produits;
