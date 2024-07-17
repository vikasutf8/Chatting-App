
import express from 'express';
import { addMembers, deleteChat, getChatDetail, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../controllers/chat.controller.js';
import { addMembersValidator, chatIdValidor, newGroupValidator, removeGroupValidator, removeMembersValidator, sendAttachmentsValidator, validateHandler } from '../lib/validators.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const router = express.Router();

// below routes access only by authenticated users
router.use(isAuthenticated)
router.post('/new', newGroupValidator(), validateHandler, newGroupChat);
router.get('/my', getMyChats);
router.get('/my/groups', getMyGroups);
router.put('/addmembers',addMembersValidator(),validateHandler,addMembers)
router.put("/removemember",removeMembersValidator(),validateHandler ,removeMember)
router.delete("/leave/:_id",chatIdValidor(), validateHandler, leaveGroup)

// send Attachment
router.post("/message",attachmentsMulter,sendAttachmentsValidator(),validateHandler, sendAttachments)
// get message 
router.get("/message/:_id",chatIdValidor(),validateHandler,getMessages)
// get chat detail,rename chat,delete chat
router.route("/:_id")
.get(chatIdValidor(),validateHandler,getChatDetail)
.put(removeGroupValidator(),validateHandler,renameGroup)
.delete(chatIdValidor(),validateHandler,deleteChat);

export default router;