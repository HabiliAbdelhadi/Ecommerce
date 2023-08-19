import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Link,
  Alert,
} from "@mui/material";
import { Facebook, Email, Instagram } from "@mui/icons-material";
import axios from "../api/axios";

const TikTokIcon = ({ color }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="24px"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

const Contact = () => {
  const socialLinks = [
    { icon: <TikTokIcon color="#333333" />, link: "tiktok" },
    { icon: <Facebook sx={{ color: "#333333" }} />, link: "fb" },
    {
      icon: <Instagram sx={{ color: "#333333" }} />,
      link: "https://www.instagram.com/9oba3/",
    },
    {
      icon: <Email sx={{ color: "#333333" }} />,
      link: "mailto:rahim@example.com",
    },
  ];

  const formRef = useRef(null);
  const [sent, setSent] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    console.log("Sent state:", sent);
  }, [sent]); // Watch for changes to 'sent' state

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const tel = event.target.phoneNumber.value;
    const message = event.target.message.value;
    console.log({ email, tel, message });

    try {
      const response = await axios.post("/messages", {
        email,
        tel,
        message,
      });

      formRef.current.reset();
      setSent("pass");
    } catch (error) {
      setSent("fail");
      if (error.response.data.error.includes("email")) {
        setErrMsg("Veuillez entrer une adresse email valide");
      } else if (error.response.data.error.includes("tel")) {
        setErrMsg("Veuillez entrer un numéro de téléphone valide");
      } else {
        setErrMsg("Erreur lors de la soumission du message");
      }
    }
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        marginTop: "6px",
        display: "flex",
        justifyContent: "center", //hmm?
      }}
    >
      <Grid item xs={12} sm={5}>
        <Card
          variant="outlined"
          sx={{ borderColor: "#333333", borderRadius: "16px" }}
        >
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              sx={{
                background: "#fed540",
                borderRadius: "16px",
              }}
              gutterBottom
            >
              Liens Sociaux
            </Typography>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              display="flex"
              flexDirection="column"
            >
              {socialLinks.map((item, index) => (
                <Grid item key={index} display="flex" flexDirection="row">
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.icon}
                  </Link>
                  <Link
                    marginLeft={2}
                    href={item.link}
                    color="inherit"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.link.replace("mailto:", "")}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card
          variant="outlined"
          sx={{ borderColor: "#333333", borderRadius: "16px" }}
        >
          <CardContent>
            <form onSubmit={handleSubmit} ref={formRef}>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  background: "#fed540",
                  borderRadius: "16px",
                }}
                gutterBottom
              >
                Laissez un message
              </Typography>
              {sent === "pass" ? (
                <Alert>Message envoyé avec succès.</Alert>
              ) : sent === "fail" ? (
                <Alert severity="error">{errMsg}!</Alert>
              ) : null}
              <TextField
                required
                fullWidth
                id="email"
                label="Adresse Email"
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Numéro de Téléphone"
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="message"
                label="Message"
                variant="outlined"
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="yellowgreen"
                sx={{ borderRadius: "12px" }}
              >
                Envoyer
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Contact;
