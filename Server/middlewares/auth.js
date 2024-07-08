

import  jwt  from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";

// to access my profile mean id -> (req.user) via userDB se
const  isAuthenticated = (req, res, next) => {
    // console.log("isAuthenticated : ",req.cookies["ChatApp-token"])
    const token = req.cookies["ChatApp-token"];
    if (!token) return next(new ErrorHandler("Please Login to access this route", 401));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData._id;

    next();
};

export { isAuthenticated };