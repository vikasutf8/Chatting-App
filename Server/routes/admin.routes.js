import express from "express";
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from "../controllers/admin.controller.js";
import { adminValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();


router.post("/verify",adminValidator(),validateHandler,adminLogin)
router.get("/logout",adminLogout)
// only admins can access the following routes
router.use(adminOnly); 
router.get("/" ,getAdminData)
router.get("/users", allUsers)
router.get("/chats", allChats)
router.get("/messages",allMessages)

router.get("/stats" ,getDashboardStats)

export default router;