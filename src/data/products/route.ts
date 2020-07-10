import express from "express";
import Product from "./model";
import ResponseTemplate, { ResponseData } from "./../../responses/Template";

const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  const response = new ResponseTemplate();
  response.links.self =
    req.protocol + "://" + req.get("host") + req.originalUrl;

  try {
    const products = await Product.find();
    if (products) {
      const data = new ResponseData();
      data.items = products;
      data.size = products.length;
      response.data = data;
    }
    res.json(response);
  } catch {
    response.success = false;
    response.message = "No product found";
    res.status(404).json(response);
  }
});

productRoute.get("/:id", async (req, res) => {
  const response = new ResponseTemplate();
  response.links.self =
    req.protocol + "://" + req.get("host") + req.originalUrl;

  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      const data = new ResponseData();
      data.items = [product];
      data.size = 1;
      response.data = data;
    }
    res.json(response);
  } catch {
    response.success = false;
    response.message = "No product with id " + req.params.id;
    res.status(404).json(response);
  }
});

export default productRoute;
