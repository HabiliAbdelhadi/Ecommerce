import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Box, Container, Typography, Divider, Card } from "@mui/material";

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

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 2,
      }}
    >
      <Card sx={{ background: "#fed540", borderRadius: "10px" }} elevation={4}>
        <Divider maxWidth="100vw">
          <Typography align="center" variant="h5">
            Produit Tendance
          </Typography>
        </Divider>
      </Card>

      <ProductCard data={data1.produits} />

      <Card sx={{ background: "#fed540", borderRadius: "10px" }} elevation={4}>
        <Divider maxWidth="100vw">
          <Typography align="center" variant="h5">
            Tous les Produits
          </Typography>
        </Divider>
      </Card>
      <ProductCard data={data2.produits} />
    </Container>
  );
};

export default Produits;
