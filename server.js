"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const productRoute = require("./routes/product");
// const cartRoute = require("./routes/cart");
// const orderRoute = require("./routes/order");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const serverless = require("serverless-http");

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB connection successfull !"))
	.catch((err) => {
		console.log(err);
	});

const Product = require("../models/Product");

const router = require("express").Router();

//CREATE
router.post("/", async (req, res) => {
	const newProduct = new Product(req.body);
	try {
		const savedProduct = await newProduct.save();
		res.status(200).json(savedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let products;
		if (qNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			products = await Product.find();
		}

		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
});

//FIND PRODUCT
router.get("/find/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;

app.use(cors());
app.use(express.json());
// app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);
app.use("/.netlify/functions/server", router);
// app.use(express.static("./client/pizza-portal/dist"));

// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "./client/pizza-portal/dist"));
// });

// app.listen(process.env.PORT || 5000, () => {
// 	console.log("Backend server is running !");
// });
module.exports = app;
module.exports.handler = serverless(app);
