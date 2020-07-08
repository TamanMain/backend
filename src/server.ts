import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import data from "./data/data";

import userRoute from "./user/route";

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

app.get("/p/:id", (req, res) => {
  const product = data.products.find((p) => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "No product with id " + req.params.id });
  }
});

app.get("/search", (req, res) => {
  const p = req.query.p;
  if (p) {
    const products = data.products.filter((product) => product.type == p);
    res.json(products);
  } else {
    res.json(data);
  }
});

app.get("/products", (req, res) => {
  res.json(data);
});

app.get("/favorite", (req, res) => {
  res.json(data);
});

app.post("/login", (req, res) => {
  const user = data.users.find(
    (user) => user._id === req.body.email && user.password === req.body.password
  );
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "Wrong email or password" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is started on port ${port}.`);
});
