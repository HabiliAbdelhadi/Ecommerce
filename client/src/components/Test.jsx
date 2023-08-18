import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

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
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <Card>
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

              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {item.nom}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Test;
