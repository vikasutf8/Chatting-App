
import express from 'express';
import { getMyChats, getMyGroups, newGroupChat } from '../controllers/chat.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// below routes access only by authenticated users
router.use(isAuthenticated)
router.post('/new', newGroupChat);
router.get('/my', getMyChats);
router.get('/my/groups', getMyGroups);



export default router;