const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const setupSequelize = require("./models");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

app.get("/", (req, res) => {
  res.send("welcome to server");
});

app.listen(3333, () => {
  console.log("server online in port: 3333");
});
