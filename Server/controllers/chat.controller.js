import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { deleteFileFromCloudinary, emitEvent } from "../utils/feature.js";
import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import e from "express";
import { Message } from "../models/message.model.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(
      new ErrorHandler("Group chat must have at least 2 members", 400)
    );
  }

  const allMembers = [...members, req.user];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });
  emitEvent(req, ALERT, allMembers, `welcome to the group chat ${name}`); //include me
  emitEvent(req, REFETCH_CHATS, members); // control other members

  return res.status(201).json({
    success: true,
    message: "Group chat created successfully",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(members, req.user);
    // id,isgroup chat ->depend avatar /members(expet me)
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    message: "Chats fetched successfully",
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => ({
    _id,
    groupChat,
    name,
    avatar: members.map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    message: "Groups fetched successfully",
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length === 0) {
    return next(new ErrorHandler("Please provide members", 400));
  }

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }
  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not authorized to add members", 403));
  }

  // accessing User model -promise eka sath le lege
  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));
  const allNewMembers = await Promise.all(allNewMembersPromise);
  // only added unique members
  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers); //only ids
  // lenght of group
  if (chat.members.length > 249) {
    return next(
      new ErrorHandler(`Members limit exceeded ${chat.members.length} `, 400)
    );
  }

  await chat.save();

  const allUsersName = allNewMembers.map((i) => i.name).join(", "); //string format

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} added to the group chat ${chat.name}`
  );
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

const removeMember = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;
  if (!userId || !chatId) {
    return next(new ErrorHandler("userId and chatId are required", 400));
  }
  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not allowed to add members", 403));

  if (chat.members.length <= 3)
    return next(new ErrorHandler("Group must have at least 3 members", 400));

  const allChatMembers = chat.members.map((i) => i.toString());

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(req, ALERT, chat.members, {
    message: `${userThatWillBeRemoved.name} has been removed from the group`,
    chatId,
  });

  emitEvent(req, REFETCH_CHATS, allChatMembers);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params._id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );

  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members", 400));

  if (chat.creator.toString() === req.user.toString()) {
    const randomElement = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomElement];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);

  emitEvent(req, ALERT, chat.members, {
    chatId,
    message: `User ${user.name} has left the group`,
  });

  return res.status(200).json({
    success: true,
    message: "Leave Group Successfully",
  });
});

const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;

  const files = req.files || [];

  if (files.length < 1)
    return next(new ErrorHandler("Please Upload Attachments", 400));

  if (files.length > 5)
    return next(new ErrorHandler("Files Can't be more than 5", 400));

  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (files.length < 1)
    return next(new ErrorHandler("Please provide attachments", 400));

  //   Upload files cloudinary
  const attachments = [
    // {
    //   public_id: "public_id",
    //   url: "url",
    // }
  ];

  const messageForDB = {
    content: "",
    attachment: attachments,
    sender: me._id,
    Chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: me._id,
      name: me.name,
    },
  };

  const message = await Message.create(messageForDB);

  emitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetail = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params._id)
      .populate("members", "name avatar")
      .lean();
    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params._id);
    if (!chat) return next(new ErrorHandler("Chat not found", 404));
    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params._id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not authorized to rename the group", 403)
    );

  chat.name = name;
  await chat.save();

  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    message: "Group renamed successfully",
    chat,
  });
});

const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params._id;

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  const members = chat.members;
  if(chat.groupChat){
    if (chat.creator.toString() !== req.user.toString())
      return next(
        new ErrorHandler("You are not authorized to delete the group", 403)
      );
  }

  if(!chat.groupChat && !chat.members.includes(req.user.toString())) {
    return next(new ErrorHandler("You are not authorized to delete the chat", 403))
  }

  // delete chat
  // delete messages  also delete attachments from cloudinary
  const messagesWithAttachments = await Message.find({
    Chat: chatId,
    attachment: { $exists: true , $ne: []},
  });
  const public_ids =[];

  messagesWithAttachments.forEach(({attachment}) => 
    attachment.forEach(({public_id}) => 
      public_ids.push(public_id))
  )

  await Promise.all([
    // delete files from cloudinary
    deleteFileFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({Chat: chatId}),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
})

const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params._id;

  // mongoose pagination and queries
  const { page = 1} = req.query;

  const limit = 19;
  const skip = (page - 1) * limit;
  const [messages,totalMessageCount] = await Promise.all([
    Message.find({ Chat: chatId })
    .sort({createdAt : -1})
    .limit(limit)
    .skip(skip)
    .populate("sender", "name ")
    .lean(),
    Message.countDocuments({ Chat: chatId }),
  ])

const totalPages = Math.ceil(totalMessageCount / limit) || 0;

return res.status(200).json({
  success: true,
  messages: messages.reverse(),
  totalPages,
  totalMessageCount,
})

})

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetail,
  renameGroup,
  deleteChat,
  getMessages,
};
