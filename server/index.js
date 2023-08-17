const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
/////////////////////////////////////////
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
/////////////////////////////////////////
const cookieParser = require("cookie-parser");
app.use(cookieParser());
/////////////////////////////////////////
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database :" + process.env.MONGO_URL);
  })
  .catch((err) => {
    console.log(err);
  });
///////////////////////////////////////////////
app.use(express.static("./public"));
///////////////////////////////////////////////
app.use(require("./routes/produitRouter"));
app.use(require("./routes/messageRouter"));
///////////////////////////////////////////////
app.listen(process.env.PORT, () => {
  console.log("connected at port :" + process.env.PORT);
});
