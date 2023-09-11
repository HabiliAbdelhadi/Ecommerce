import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  ButtonGroup,
  CardActionArea,
  Link,
  CardMedia,
  CardContent,
  Box,
  Container,
  Paper,
  Card,
  Divider,
  List,
  ListItem,
  Modal,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "../api/axios";

const Panier = () => {
  const [commande, setCommande] = useState([]);
  const [memo, setMemo] = useState(
    JSON.parse(localStorage.getItem("commande")) || []
  );

  useEffect(() => {
    memo.map(async (item, index) => {
      try {
        const response = await axios.get(`/produits/${item.id}`);

        setCommande((prevCommande) => {
          // Check if the item with the same index already exists
          const itemExists = prevCommande.find(
            (prevItem) => prevItem.index === index
          );
          if (!itemExists) {
            // Append the item to the state if it doesn't exist
            return [
              ...prevCommande,
              {
                index: index,
                product: response.data,
                qte: item.qte,
              },
            ];
          } else {
            itemExists.qte = item.qte;
            return [...prevCommande];
          }
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, [memo]);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(0);
    commande.map((item) => {
      setTotal((prevTotal) => {
        return prevTotal + item.product.prix * item.qte;
      });
    });
  }, [commande]);

  const [modal, setModal] = useState(false);

  return (
    <Box sx={{ mx: { xs: 0.5, sm: 1, md: 2.5, lg: 5 } }}>
      <Paper sx={{ mt: "15px" }} elevation={4} my={1}>
        <Card
          variant="outlined"
          sx={{
            background: "white",
            borderRadius: "23px",
            width: "100%",
            borderColor: "#93370a",
            borderWidth: "2px",
          }}
        >
          <Divider maxwidth="100vw">
            <Typography
              align="center"
              sx={{ typography: { xs: "h5", sm: "h4" } }}
              color="#93370a"
            >
              Articles du panier
            </Typography>
          </Divider>
        </Card>

        <List>
          {commande.map((item, index) => (
            <>
              <ListItem key={index}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={5}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      style={{ maxWidth: "100%" }}
                      src={`http://localhost:8000/${item.product.pictures[0].replace(
                        "public\\",
                        ""
                      )}`}
                      alt={item.product.nom}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: {
                            xs: "space-around",
                            sm: "space-between",
                          },
                        }}
                      >
                        <Typography
                          typography={{ xs: "h6", sm: "h5", md: "h4" }}
                          textAlign={{ xs: "center", sm: "start" }}
                        >
                          <strong>{item.product.nom}</strong>
                        </Typography>
                        <Typography
                          typography={{ xs: "body1", sm: "h6", md: "h5" }}
                          color="#de7c11"
                          textAlign={{ xs: "center", sm: "end" }}
                        >
                          <span style={{ color: "black", marginRight: "4px" }}>
                            Prix :
                          </span>
                          {item.product.prix * item.qte} DZD
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          typography={{ xs: "body1", sm: "h6", md: "h5" }}
                          gutterBottom
                          textAlign="center"
                        >
                          Quantite:
                        </Typography>
                        <ButtonGroup
                          variant="outlined"
                          color="bri"
                          sx={{ marginLeft: "6px" }}
                          size="small"
                        >
                          <Button
                            disabled={item.qte <= 1}
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              borderRadius: "16px",
                            }}
                            onClick={() => {
                              memo[index].qte = item.qte - 1;

                              // Save the updated cart back to local storage
                              localStorage.setItem(
                                "commande",
                                JSON.stringify(memo)
                              );

                              setMemo(
                                JSON.parse(localStorage.getItem("commande"))
                              );
                            }}
                          >
                            <RemoveIcon size="small" />
                          </Button>
                          <Button
                            sx={{ color: "black", fontWeight: "bold" }}
                            variant="contained"
                            disableElevation
                            disableTouchRipple
                          >
                            {item.qte}
                          </Button>
                          <Button
                            disabled={item.qte >= item.product.qnt}
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              borderRadius: "16px",
                            }}
                            onClick={() => {
                              memo[index].qte = item.qte + 1;

                              // Save the updated cart back to local storage
                              localStorage.setItem(
                                "commande",
                                JSON.stringify(memo)
                              );

                              setMemo(
                                JSON.parse(localStorage.getItem("commande"))
                              );
                            }}
                          >
                            <AddIcon size="small" />
                          </Button>
                        </ButtonGroup>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: { xs: "3px", sm: "0px" },
                        }}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          sx={{ borderRadius: "12px" }}
                          endIcon={<CancelIcon />}
                        >
                          <Typography variant="body2" my={0}>
                            Retirer
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </>
          ))}
          <ListItem sx={{ display: "flex", justifyContent: "center" }}>
            <ButtonGroup>
              <Button
                disableElevation
                disableFocusRipple
                disableTouchRipple
                disableRipple
                sx={{
                  borderRadius: "12px",
                  color: "black",
                  background: "white",
                  borderColor: "black",
                  borderWidth: "2px",
                }}
              >
                <Typography>
                  Total :{" "}
                  <span style={{ color: "#de7c11", fontWeight: "bold" }}>
                    {total}
                  </span>{" "}
                  DZD
                </Typography>
              </Button>
              <Button
                variant="contained"
                color="yellowgreen"
                disableElevation
                sx={{ borderRadius: "12px" }}
                onClick={() => {
                  setModal(true);
                }}
              >
                Passer la commande
              </Button>
            </ButtonGroup>
          </ListItem>
        </List>
      </Paper>
      <Modal
        open={modal}
        onClose={() => {
          setModal(false);
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper>hello!</Paper>
      </Modal>
    </Box>
  );
};

export default Panier;
