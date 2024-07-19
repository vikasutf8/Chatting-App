import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";

import { errorMiddleware } from "./middlewares/error.js";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./utils/feature.js";
import adminRoutes from "./routes/admin.routes.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";

dotenv.config({
  path: "./.env",
});
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "Chat-App-Admin";
export const userSocketIDs = new Map();
// createUser(10);
// createSingleChats(10);
// createGroupChats(10);
// createMessagesInAChat("668fa8c74c8bd7ab68a7f0ec",50)
const app = express();
const server = createServer(app);
const io = new Server(server, {});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173",process.env.CLIENT_URL],
  credentials: true,
}));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send(`Server is running on http://localhost:${port} in ${envMode} mode`);
});
// middleware for socket.io
// io.use((socket, next) => {

// })

io.on("connection", (socket) => {
  const user = {
    _id: uuid(),
    name: "John Doe",
  };
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSockets = getSockets(members);
    io.to(membersSockets).emit(NEW_MESSAGE, {
        chatId,
        message: messageForRealTime,
    })
    io.to(membersSockets).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });

    try {
        await Message.create(messageForDB);
    } catch (error) {
        console.log("Error in saving message to DB", error);
    }

    console.log(messageForRealTime);

  });

/**
 * {
    "chatId": "668fa8c74c8bd7ab68a7f0e3",
    "message": {
        "content": "its doen",
        "_id": "6e6ad9f8-dd1a-4912-98c0-8613b69798af",
        "sender": {
            "_id": "79c97745-605b-4a11-a74c-20c90f835aff",
            "name": "John Doe"
        },
        "chat": "668fa8c74c8bd7ab68a7f0e3",
        "createdAt": "2024-07-18T14:32:39.954Z"
    }
 
 
 */

    

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port} in ${envMode} mode`
  );
});
