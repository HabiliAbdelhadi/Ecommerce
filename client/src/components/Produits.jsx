import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  Grid,
  Slider,
  Container,
  Typography,
  Divider,
  Card,
  Button,
  Drawer,
  TextField,
  InputAdornment,
  Pagination,
  List,
  ListItem,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation } from "react-router-dom";

const Produits = () => {
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get("/produits?featured=true");
        setData1(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData1();
  }, []);

  const [data2, setData2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categorie = query.get("categorie");

  const [filter, setFilter] = useState({
    minPrix: 0,
    maxPrix: 20000,
    categorie: categorie || "",
    search: "",
    sex: "",
  });
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          `/produits?limit=8&page=${currentPage}&search=${filter.search}&sex=${filter.sex}&categorie=${filter.categorie}&minPrix=${filter.minPrix}&maxPrix=${filter.maxPrix}`
        );
        setData2(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData2();
  }, [currentPage, filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
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
            Produit Tendance
          </Typography>
        </Divider>
      </Card>

      <ProductCard data={data1.produits} />
      <br />
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
              onChange={(event) => {
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  search: event.target.value,
                }));
              }}
              color="othercolor"
              sx={{
                display: "flex",
                background: "white",
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
              color="yellowgreen"
              sx={{ color: "black", borderRadius: "12px" }}
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
        <Container
          maxWidth="lg"
          sx={{
            minWidth: { xs: "85vw", sm: "75vw", md: "60vw", lg: "45vw" },
            background: "#333333",
            minHeight: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box width="100%">
            <List>
              <ListItem>
                <InputLabel id="Sexe" sx={{ color: "#fed540" }}>
                  Sexe
                </InputLabel>
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <Select
                    value={filter.sex}
                    color="yellowgreen"
                    variant="standard"
                    labelId="Sexe"
                    id="Sexe"
                    label="Sexe"
                    sx={{ background: "white" }}
                    onChange={(event) => {
                      setFilter((prevFilter) => ({
                        ...prevFilter,
                        sex: event.target.value,
                      }));
                    }}
                  >
                    <MenuItem value={null}>Aucun Filtre</MenuItem>
                    <MenuItem value={"homme"}>Homme</MenuItem>
                    <MenuItem value={"femme"}>Femme</MenuItem>
                    <MenuItem value={"unisex"}>Unisex</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <InputLabel id="Categorie" sx={{ color: "#fed540" }}>
                  Categorie
                </InputLabel>
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <Select
                    value={filter.categorie}
                    color="yellowgreen"
                    variant="standard"
                    sx={{ background: "white" }}
                    labelId="Categorie"
                    id="Categorie"
                    label="Categorie"
                    onChange={(event) => {
                      setFilter((prevFilter) => ({
                        ...prevFilter,
                        categorie: event.target.value,
                      }));
                    }}
                  >
                    <MenuItem value={null}>Aucun Filtre</MenuItem>
                    <MenuItem value={"bijoux"}>Bijoux</MenuItem>
                    <MenuItem value={"sacs"}>Sacs</MenuItem>
                    <MenuItem value={"lunettes"}>Lunettes</MenuItem>
                    <MenuItem value={"chapeaux"}>Chapeaux</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>

              <ListItem>
                <FormControl fullWidth>
                  <InputLabel id="Prix" sx={{ color: "#fed540" }}>
                    Prix
                  </InputLabel>
                  <br />
                  <br />
                  <Slider
                    color="yellowgreen"
                    value={[filter.minPrix, filter.maxPrix]}
                    min={0}
                    max={20000}
                    step={1000}
                    marks
                    onChange={(event) => {
                      setFilter((prevFilter) => ({
                        ...prevFilter,
                        minPrix: event.target.value[0],
                        maxPrix: event.target.value[1],
                      }));
                    }}
                    valueLabelDisplay="auto"
                  />
                  <br />
                </FormControl>
              </ListItem>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<ClearIcon />}
                  onClick={() => {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      minPrix: 0,
                      maxPrix: 20000,
                      categorie: "",
                      sex: "",
                    }));
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </Box>
            </List>
          </Box>
        </Container>
      </Drawer>
      <ProductCard data={data2.produits} />
      <br />
      {data2.totalPages > 1 ? (
        <Pagination
          page={currentPage}
          onChange={(event, newPage) => {
            setCurrentPage(newPage);
          }}
          count={data2.totalPages}
          sx={{ alignSelf: "center" }}
          color="yellowgreen"
        />
      ) : null}
    </Container>
  );
};

export default Produits;
