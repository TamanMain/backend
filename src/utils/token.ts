import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserDocument } from "../data/users/model";
import config from "../config";
import User from "./../data/users/model";
import { responseFail } from "./../responses/Template";

const getToken = (user: UserDocument) => {
  return jwt.sign(user.toJSON(), config.JWT_SECRET_KEY, { expiresIn: "24h" });
};

const isAuth: RequestHandler = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    const resFail = responseFail(req, "Authorization token is not suplied");
    res.status(401).json(resFail);
    return;
  }

  const token = authToken.slice(7, authToken.length);
  const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

  User.findOne({ email: (<UserDocument>decoded).email })
    .then((user) => {
      if (user) {
        next();
        return;
      } else {
        throw new Error("User does not exist");
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export { getToken, isAuth };
