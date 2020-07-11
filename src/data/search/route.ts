import express from "express";
import Product, { ProductDocument } from "../products/model";
import { responseFail, responseSuccess } from "./../../responses/Template";

const searchRoute = express.Router();

searchRoute.get("/", async (req, res) => {
  const category = req.query.category;
  if (category) {
    const query = { categories: category };
    // @ts-ignore
    const products = await Product.find(query);
    res.json(responseSuccess(req, "Product list", products));
  } else {
    const resFail = responseFail(req, "No search query found");
    res.status(404).json(resFail);
  }
});

export default searchRoute;
