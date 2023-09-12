import { Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import Produits from "./components/Produits";
import Footer from "./components/Footer";
import Produit from "./components/Produit";
import Panier from "./components/Panier";
import { BadgeProvider } from "./context/BadgeContext";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Playfair Display", "serif"].join(","),
    },
    palette: {
      yellowgreen: {
        main: "#fed540",
      },
      othercolor: { main: "#93370a" },
      bri: { main: "#de7c11" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BadgeProvider>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }} //pushed footer stuff
        >
          <Navbar />

          <div style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public */}
                <Route path="contact" element={<Contact />}></Route>
                <Route path="produits" element={<Produits />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/produits/:id" element={<Produit />}></Route>
                <Route path="panier" element={<Panier />}></Route>
              </Route>

              {/* else */}
              <Route path="*" element={<Missing />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </BadgeProvider>
    </ThemeProvider>
  );
}

export default App;
