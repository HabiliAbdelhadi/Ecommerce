import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActionArea,
  CircularProgress,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  if (!data) {
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
  if (data.length === 0) {
    return <p style={{ textAlign: "center" }}>No elements to show</p>;
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: "1px",
        mb: "10px",
        justifyContent: "center",
      }}
    >
      {data.map((item) => (
        <Grid item key={item._id} xs={12} sm={4} md={3}>
          <Card
            variant="outlined"
            sx={{
              //ana chikour bzf
              ":hover": {
                boxShadow: 16,
                borderColor: "#fed540",
                borderWidth: "3px",
              },
              borderColor: "#93370a",
              borderRadius: "10px",
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
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: "3px",
                  }}
                >
                  <Typography variant="body1">{item.nom}</Typography>
                  <Typography variant="body1" color="#de7c11">
                    {item.prix} DZD
                  </Typography>
                </Box>

                <Typography variant="body1" color="#808080" textAlign="start">
                  {item.marque}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCard;
