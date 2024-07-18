import express from "express";
import { adminLogin, allChats, allMessages, allUsers, getDashboardStats } from "../controllers/admin.controller.js";
import { adminValidator, validateHandler } from "../lib/validators.js";

const router = express.Router();

router.get("/" )

router.post("/verify",adminValidator(),validateHandler,adminLogin)

router.get("/logout")

router.get("/users", allUsers)
router.get("/chats", allChats)
router.get("/messages",allMessages)

router.get("/stats" ,getDashboardStats)

export default router;