import express from "express";
import { allChats, allMessages, allUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/" )

router.post("/verify")

router.get("/logout")

router.get("/users", allUsers)
router.get("/chats", allChats)
router.get("/messages",allMessages)

router.get("/stats")

export default router;