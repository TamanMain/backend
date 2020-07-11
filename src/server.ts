import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";

import userRoute from "./data/users/route";
import categoryRoute from "./data/categories/route";
import productRoute from "./data/products/route";
import searchRoute from "./data/search/route";

import Product from "./data/products/model";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/search", searchRoute);

// OLD CODE

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/favorite", async (req, res) => {
  const products = await Product.find();
  res.json({ products: products });
});

app.listen(port, () => {
  console.log(`Backend server is started on port ${port}.`);
});
