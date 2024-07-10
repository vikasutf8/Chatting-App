import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.model.js";
import {User} from "../models/user.model.js";
import { emitEvent } from "../utils/feature.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";


const newGroupChat =TryCatch(async (req, res, next) => {
    const { name, members } = req.body;

    if(members.length < 2){
        return next(new ErrorHandler("Group chat must have at least 2 members", 400));
    }

    const allMembers = [...members, req.user];
    await Chat.create({
        name,
        groupChat :true,
        creator: req.user,
        members: allMembers,

    });
    emitEvent(req,ALERT,allMembers,`welcome to the group chat ${name}`) //include me
    emitEvent(req,REFETCH_CHATS,members) // control other members


    return res.status(201).json({
        success: true,
        message: "Group chat created successfully",
    });
});


const getMyChats =TryCatch(async (req, res, next) => {
   
   const chats = await Chat
   .find({members: req.user})
   .populate("members", "name avatar");

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


const getMyGroups =TryCatch(async (req, res, next) => { 
    const chats = await Chat
    .find({ members: req.user, groupChat: true, creator: req.user})
    .populate("members", "name avatar");

    const groups = chats.map(({ _id, name, members,groupChat }) => ({
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

})


const addMembers =TryCatch(async (req, res, next) => {
    const { chatId, members } = req.body;

    if(!members || members.length === 0){
        return next(new ErrorHandler("Please provide members", 400));
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
        return next(new ErrorHandler("Chat not found", 404));
    }
    if(!chat.groupChat){
        return next(new ErrorHandler("This is not a group chat", 400));
    }
    if(chat.creator.toString() !== req.user.toString()){   
        return next(new ErrorHandler("You are not authorized to add members", 403));
    }


    // accessing User model -promise eka sath le lege
    const allNewMembersPromise =members.map((i)=>User.findById(i,"name"));
    const allNewMembers = await Promise.all(allNewMembersPromise);

    chat.members.push(...allNewMembers.map((i)=>i._id));  //only ids
    // lenght of group
    if(chat.members.length > 249){
        return next(new ErrorHandler(`Members limit exceeded ${chat.members.length} `, 400));
    }

    await chat.save();

    const allUsersName =allNewMembers.map((i)=>i.name).join(", "); //string format

    emitEvent(req,
        ALERT,
        chat.members,
        `${allUsersName} added to the group chat ${chat.name}`)
    emitEvent(req,REFETCH_CHATS,members) 

    return res.status(200).json({
        success: true,
        message: "Members added successfully",
    });
})

export { newGroupChat,getMyChats ,getMyGroups, addMembers};