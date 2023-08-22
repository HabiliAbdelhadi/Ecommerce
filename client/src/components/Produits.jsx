import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Box, Container, Typography } from "@mui/material";

const Produits = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/produits");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ background: "#fed540" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Produit Tendance
          </Typography>
        </Container>
        <ProductCard data={data.produits} />
      </Box>
    </Container>
  );
};

export default Produits;
