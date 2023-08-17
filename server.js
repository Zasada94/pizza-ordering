// "use strict";

const express = require("express");
const serverless = require("serverless-http"); // Import serverless-http

const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// const serverless = require("serverless-http");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/.netlify/functions/server/api/products", productRoute); // Adjust the base path for your routes
app.use("/.netlify/functions/server/api/orders", orderRoute); // Adjust the base path for your routes

module.exports.handler = serverless(app);