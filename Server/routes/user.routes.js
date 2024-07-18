
import express from 'express';
import { acceptFriendRequest, getMyAllNotifications, getMyFriends, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest, } from '../controllers/user.controller.js';
import { singleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { registerValidator, validateHandler ,loginValidator, sendRequestValidator, acceptRequestValidator } from '../lib/validators.js';
const router = express.Router();

// registerValidator() is a middleware that validates the request body and return array
router.post('/new', singleAvatar,registerValidator(),validateHandler ,newUser);
router.post('/login',loginValidator(),validateHandler, login);


// below routes access only by authenticated users
router.use(isAuthenticated)
router.get("/me",getMyProfile);
router.get("/logout",logout);
router.get("/search",searchUser);

router.put("/sendrequest",sendRequestValidator(),validateHandler, sendFriendRequest);
router.put("/acceptrequest",acceptRequestValidator(),validateHandler, acceptFriendRequest);
router.get("/notifications",getMyAllNotifications);
router.get("/friends",getMyFriends);
export default router;