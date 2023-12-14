import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(404, "Unauthorized"));

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(403, "Forbiiden"));

      req.user = user;
      next();
    });

    // jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    console.log(err);
  }
};
