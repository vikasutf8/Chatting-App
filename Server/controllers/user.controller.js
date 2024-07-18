import { compare } from "bcrypt";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/feature.js";
import { ErrorHandler } from "../utils/utility.js";
import { NEW_REQUEST } from "../constants/events.js";
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

  if (!userDB)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, userDB.password);
  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, userDB, 200, `Welcome Back, ${userDB.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const Myprofile = await User.findById(req.user);

  res.status(200).json({
    success: true,
    data: req.user,
  });
});

const logout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("ChatApp-token", " ", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const searchUser = TryCatch(async (req, res, next) => {
  const { name ="" } = req.query;
  // finding allmy chats
  const mychats = await Chat.find({
    groupChat: false,
    members: req.user,
  });
  // all users from my chats means friends or people i have chatted with
  const allUsersFromMyChats = mychats.flatMap((chat) => chat.members);
  // console.log(allUsersFromMyChats);

  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    message: name,
    users
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {

  const  {userId} =req.body;
// mongoose query to check if request already sent
  const request =await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  })

  if(request){
    return next(new ErrorHandler("Request already sent", 400));
  }

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req,NEW_REQUEST,[userId]);

  return res
    .status(200)
    .json({
      success: true,
      message: "Friend Request Sent",
    });
});


export { login, newUser, getMyProfile, logout, searchUser,sendFriendRequest };
