import express from "express";
import cors from "cors";
import data from "./data/data";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Backend server is started on port ${port}.`);
});
