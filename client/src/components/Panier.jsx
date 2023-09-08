import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  ButtonGroup,
  CircularProgress,
  Box,
  Container,
  Paper,
  Card,
  Divider,
  List,
  ListItem,
  Alert,
  Modal,
} from "@mui/material";
import axios from "../api/axios";

const Panier = () => {
  const [commande, setCommande] = useState([]);
  const [memo, setMemo] = useState(
    JSON.parse(localStorage.getItem("commande")) || []
  );
  //   explaining the mess : memo is the item from local storage : [{id: , qte:},...]
  //     commande is a new item : [{index: ,product: ,qte: }]
  //     changing the qte should call setMemo, triggering the useEffect updating commande
  useEffect(() => {
    memo.map(async (item, index) => {
      try {
        const response = await axios.get(`/produits/${item.id}`);
        console.log(response.data);
        setCommande((prevCommande) => {
          // Check if the item with the same index already exists
          const itemExists = prevCommande.some(
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
            // Return the previous state as is
            return prevCommande;
          }
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, [memo]);
  const [modal, setModal] = useState(false);
  return (
    <Container>
      <Paper sx={{ mt: "10px" }}>
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
        {JSON.stringify(commande)}
        <br />
        <List>
          {commande.map((item, index) => (
            <>
              <ListItem key={index}>
                Product ID: {item.product._id},Nom: {item.product.nom},
                Quantity:
                {item.qte}
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <Button
          variant="contained"
          color="yellowgreen"
          onClick={() => {
            setModal(true);
          }}
        >
          Passer la commande
        </Button>
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
    </Container>
  );
};

export default Panier;
