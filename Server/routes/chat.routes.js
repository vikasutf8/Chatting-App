
import express from 'express';
import { getMyChats, newGroupChat } from '../controllers/chat.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { get } from 'mongoose';
const router = express.Router();

// below routes access only by authenticated users
router.use(isAuthenticated)
router.post('/new', newGroupChat);
router.get('/my', getMyChats);


export default router;