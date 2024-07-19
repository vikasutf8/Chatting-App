import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid";
import {v2 as cloudinary} from "cloudinary";
import { getBase64 } from "../lib/helper.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to the database"))
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

const emitEvent = (req, event, users, data) => {
  console.log("Emitting event", event);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        { 
          resource_type: "auto",
          public_id:uuid(),
         },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => {
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    });   
    return formattedResults;
  } catch (error) {
    throw new Error("Error uploading files to cloudinary  " + error.message);
  }
};

const deleteFileFromCloudinary = async (public_id) => {
  // const result = await cloudinary.uploader.destroy(public_id);
  // return result;
};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFileFromCloudinary,
  uploadFilesToCloudinary,
};
