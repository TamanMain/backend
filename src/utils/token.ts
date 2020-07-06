import jwt from "jsonwebtoken";
import User, { UserDocument } from "./../user/model";
import config from "../config";

const getToken = (user: UserDocument) => {
  return jwt.sign(user.toJSON(), config.JWT_SECRET_KEY, { expiresIn: "24h" });
};

export { getToken };
