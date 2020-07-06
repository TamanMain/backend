import express from "express";
import userModel from "./model";

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  try {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(403).send({ error: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const query = {
    email: req.body.email,
    password: req.body.password,
  };
  const projection = { _id: 0, name: 1, email: 1 };

  const loginUser = await userModel.findOne(query, projection);

  if (loginUser) {
    res.status(200).json(loginUser);
  } else {
    res.status(404).send({ error: "Wrong email or password!" });
  }
});

export default userRoute;
