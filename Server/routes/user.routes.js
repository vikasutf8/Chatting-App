
import express from 'express';
import { getMyProfile, login, logout, newUser, searchUser, } from '../controllers/user.controller.js';
import { singleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();


router.post('/new',singleAvatar,newUser);
router.post('/login',login);


// below routes access only by authenticated users
router.use(isAuthenticated)
router.get("/me",getMyProfile);
router.get("/logout",logout);
router.get("/search",searchUser);



export default router;