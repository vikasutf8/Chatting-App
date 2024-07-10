
import express from 'express';
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember } from '../controllers/chat.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// below routes access only by authenticated users
router.use(isAuthenticated)
router.post('/new', newGroupChat);
router.get('/my', getMyChats);
router.get('/my/groups', getMyGroups);
router.put('/addmembers',addMembers)
router.put("/removemember",removeMember)
router.delete("/leave/:_id",leaveGroup)

// send Attachment
// get message
// get chat detail,rename chat,delete chat

export default router;