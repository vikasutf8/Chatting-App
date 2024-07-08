
import express from 'express';
import { newGroupChat } from '../controllers/chat.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

// below routes access only by authenticated users
router.use(isAuthenticated)
router.post('/new', newGroupChat);



export default router;