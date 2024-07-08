import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
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

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("ChatApp-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

export { connectDB, sendToken,cookieOptions };
