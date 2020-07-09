import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";

import Product, { ProductDocument } from "./data/products/model";

import userRoute from "./data/user/route";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error.reason));

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// API Routes
app.use("/users", userRoute);

// OLD CODE

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/p/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "No product with id " + req.params.id });
  }
});

app.get("/search", async (req, res) => {
  const searchQueries = req.query.p;
  if (searchQueries) {
    const query = {
      _id: searchQueries,
    };
    const products = await Product.find(query);
    res.json({ products: products });
  } else {
    res.json({ error: "Search parameters is required" });
  }
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json({ products: products });
});

app.get("/favorite", async (req, res) => {
  const products = await Product.find();
  res.json({ products: products });
});

app.listen(port, () => {
  console.log(`Backend server is started on port ${port}.`);
});
