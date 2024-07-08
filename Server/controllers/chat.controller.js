import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.model.js";
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

export { newGroupChat,getMyChats };