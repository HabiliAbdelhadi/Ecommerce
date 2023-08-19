import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";

const Test = () => {
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
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ marginTop: "4px" }}>
        {data.map((item) => (
          <Grid item key={item._id} xs={12} sm={4} md={3}>
            <Card
              elevation={3}
              sx={{
                //ana chikour bzf
                ":hover": {
                  boxShadow: 16,
                },
              }}
            >
              <CardActionArea component={Link} to={"/produits/" + item._id}>
                <CardMedia
                  sx={{
                    paddingTop: "56.25%", // 16:9 aspect ratio (9 / 16 * 100)
                    position: "relative",
                  }}
                  image={`http://localhost:8000/${item.pictures[0].replace(
                    "public\\",
                    ""
                  )}`}
                  title={item.nom}
                  alt={item.nom}
                />
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1">{item.nom}</Typography>
                  <Typography variant="body1" color="#de7c11">
                    {item.prix} DZD
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Test;
