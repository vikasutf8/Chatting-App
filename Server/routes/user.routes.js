
import express from 'express';
import { getMyProfile, login, logout, newUser, searchUser, } from '../controllers/user.controller.js';
import { singleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { registerValidator, validateHandler ,loginValidator } from '../lib/validators.js';
const router = express.Router();

// registerValidator() is a middleware that validates the request body and return array
router.post('/new', singleAvatar,registerValidator(),validateHandler ,newUser);
router.post('/login',loginValidator(),validateHandler, login);


// below routes access only by authenticated users
router.use(isAuthenticated)
router.get("/me",getMyProfile);
router.get("/logout",logout);
router.get("/search",searchUser);



export default router;