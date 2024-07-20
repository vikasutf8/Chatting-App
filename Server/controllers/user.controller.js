import { compare } from "bcrypt";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/feature.js";
import { ErrorHandler } from "../utils/utility.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
// crate a new user and save to the database and send a token
const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const file = req.file;
  if (!file) return next(new ErrorHandler("Please Upload Avatar"));
  
  const result = await uploadFilesToCloudinary([file]);
  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
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

  if (!Myprofile) return next(new ErrorHandler("User not found", 404));
  res.status(200).json({
    success: true,
    Myprofile,
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
  const { name = "" } = req.query;
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
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  // mongoose query to check if request already sent
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) {
    return next(new ErrorHandler("Request already sent", 400));
  }

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend Request Sent",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");
  // console.log(request)
  if (!request) {
    return next(new ErrorHandler("Request not found", 404));
  }

  if (request.receiver._id.toString() !== req.user.toString()) {
    return next(new ErrorHandler("user should be Receiver", 401));
  }

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} -- ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted",
    senderId: request.sender._id,
  });
});

const getMyAllNotifications = TryCatch(async (req, res, next) => {
  const requests = await Request.find({
    receiver: req.user,
  }).populate("sender", "name avatar");

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allRequests,
  });
});

const getMyFriends = TryCatch(async (req, res, next) => {
  // non group chats
  const chatId = req.query.chatId;
  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);
    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);
    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    return res.status(200).json({
      success: true,
      availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});

export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyAllNotifications,
  getMyFriends,
};
