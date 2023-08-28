// "use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
// const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");
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
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server is running !");
});
