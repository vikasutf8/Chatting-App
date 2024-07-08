import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.model.js";
import { emitEvent } from "../utils/feature.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";


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


export { newGroupChat };