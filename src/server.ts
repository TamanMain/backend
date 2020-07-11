import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";

import userRoute from "./data/users/route";
import productRoute from "./data/products/route";

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
app.use("/products", productRoute);

// OLD CODE

app.get("/", (req, res) => {
  res.send("Hello World!");
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

app.get("/favorite", async (req, res) => {
  const products = await Product.find();
  res.json({ products: products });
});

app.listen(port, () => {
  console.log(`Backend server is started on port ${port}.`);
});
