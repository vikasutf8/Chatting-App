import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const cookieOptions = {
    expires : 15 * 24 * 60 * 60 * 1000,
    sameSite:"none",
    secure:true,
    httpOnly:true,
    };

const connectDB = (uri) => {
  mongoose
    .connect(uri)

    .then((data) =>
      // console.log(data)
      // `Connected to the database ${data.connection.host}`)
      console.log("Connected to the database")
    )
    .catch((err) => {
      console.log("Error connecting to the database");
      throw err;
    });
};

const sendToken = (res, code, user, message) => {
  const token = jwt.sign(
    { _id: user._id }, 
    process.env.JWT_SECRET, 
   );
    return res.status(code)
        .cookie("Chat-App", token, cookieOptions)
        .json({
            success: true,
            message,
  });
};

export { connectDB, sendToken };
