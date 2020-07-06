import express from "express";
import User from "./model";
import { getToken } from "../utils/token";

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  try {
    const user = new User({
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

  const loginUser = await User.findOne(query, projection);

  if (loginUser) {
    res.status(200).json({ user: loginUser, token: getToken(loginUser) });
  } else {
    res.status(404).send({ error: "Wrong email or password!" });
  }
});

export default userRoute;
