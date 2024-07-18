import express from "express";
import { allUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/" )

router.post("/verify")

router.get("/logout")

router.get("/users", allUsers)
router.get("/chats")
router.get("/messages")

router.get("/stats")

export default router;