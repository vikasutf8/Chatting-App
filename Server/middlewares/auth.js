import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";

// to access my profile mean id -> (req.user) via userDB se
const isAuthenticated = (req, res, next) => {
  // console.log("isAuthenticated : ",req.cookies["ChatApp-token"])
  const token = req.cookies["ChatApp-token"];
  if (!token)
    return next(new ErrorHandler("Please Login to access this route", 401));
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData._id;

  next();
};

const adminOnly = (req, res, next) => {
  const token = req.cookies["Chat-App-Admin"];
  if (!token)
    return next(new ErrorHandler("only ADMIN casn access this route", 401));
  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) return next(new ErrorHandler("Only Admin can access this route", 401));

  next();
};

export { isAuthenticated ,adminOnly};
