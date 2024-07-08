import {compare} from "bcrypt";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/feature.js";
import { ErrorHandler } from "../utils/utility.js";

// crate a new user and save to the database and send a token
const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  // const file = req.file;
  // if (!file) return next(new ErrorHandler("Please Upload Avatar"));
  // const result = await uploadFilesToCloudinary([file]);
  // const avatar = {
  //   public_id: result[0].public_id,
  //   url: result[0].url,
  // };
  const avatar = {
    public_id: "public_id",
    url: "url",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  sendToken(res, user, 201, "User created successfully");
});



//   login a register user
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  
  const userDB = await User.findOne({ username }).select("+password");
 
  if (!userDB) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, userDB.password);
  if (!isMatch) return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, userDB, 200, `Welcome Back, ${userDB.name}`);
});




const getMyProfile = TryCatch(async (req, res, next) => {});



export { login, newUser, getMyProfile };
