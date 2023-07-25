"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
// const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// const serverless = require("serverless-http");

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB connection successfull !"))
	.catch((err) => {
		console.log(err);
	});

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
// app.use("/.netlify/functions/server", router);
// app.use(express.static("./client/pizza-portal/dist"));

// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "./client/pizza-portal/dist"));
// });

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server is running !");
});
// module.exports = app;
// module.exports.handler = serverless(app);
