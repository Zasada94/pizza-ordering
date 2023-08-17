"use strict";

const express = require("express");
const Order = require("../models/Order");

const app = express();

// CREATE
app.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = app; 