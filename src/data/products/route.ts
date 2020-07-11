import express from "express";
import Product from "./model";
import { isAuth } from "../../utils/token";
import { responseFail, responseSuccess } from "./../../responses/Template";

const productRoute = express.Router();

productRoute.post("/", isAuth, async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.json(responseSuccess(req, "Products", products));
    } else {
      const resFail = responseFail(req, "No product found");
      res.status(404).json(resFail);
    }
  } catch {
    const resFail = responseFail(req, "No product found");
    res.status(404).json(resFail);
  }
});

productRoute.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.json(responseSuccess(req, "Products", products));
    } else {
      const resFail = responseFail(req, "No product found");
      res.status(404).json(resFail);
    }
  } catch {
    const resFail = responseFail(req, "No product found");
    res.status(404).json(resFail);
  }
});

productRoute.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      product.statistics.views = product.statistics.views + 1;
      await product.save((err) => {
        if (err) console.error(err);
      });

      res.json(responseSuccess(req, "Product", [product]));
    } else {
      const resFail = responseFail(req, "No product found");
      res.status(404).json(resFail);
    }
  } catch {
    const resFail = responseFail(req, "No product with id " + req.params.id);
    res.status(404).json(resFail);
  }
});

export default productRoute;
