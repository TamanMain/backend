import express from "express";
import Category, { CategoryDocument } from "./model";
import { isAuth } from "../../utils/token";
import { responseSuccess, responseFail } from "./../../responses/Template";

const categoryRoute = express.Router();

categoryRoute.post("/", isAuth, async (req, res) => {
  try {
    const category: CategoryDocument = new Category();
    category.name = req.body.name.toLowerCase();
    category.displayName = req.body.displayName;
    category.icon = req.body.icon;
    category.description = req.body.description;

    const newCategory = await category.save();

    const resSuccess = responseSuccess(req, "New category added", [
      newCategory,
    ]);
    res.status(201).json(resSuccess);
  } catch (error) {
    const resFail = responseFail(req, error.message);
    res.status(403).json(resFail);
  }
});

categoryRoute.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length > 0) {
      res.json(responseSuccess(req, "Category List", categories));
    } else {
      const resFail = responseFail(req, "No category found");
      res.status(404).json(resFail);
    }
  } catch {
    const resFail = responseFail(req, "No category found");
    res.status(404).json(resFail);
  }
});

export default categoryRoute;
