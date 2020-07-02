import express from "express";
import data from "./data/data";

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.send(data.products);
});

app.listen(PORT, () => {
  console.log(`Backend server is started on port ${PORT}.`);
});
