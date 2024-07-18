import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';



import { errorMiddleware } from './middlewares/error.js';
import chatRoutes from './routes/chat.routes.js';
import userRoutes from './routes/user.routes.js';
import { connectDB } from './utils/feature.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config({
    path:'./.env'
});
const mongoURI=process.env.MONGO_URI;
const port = process.env.PORT || 3000;
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "Chat-App-Admin";
connectDB(mongoURI);

// createUser(10);
// createSingleChats(10);
// createGroupChats(10);
// createMessagesInAChat("668fa8c74c8bd7ab68a7f0ec",50)
const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/user",userRoutes);
app.use("/chat",chatRoutes);
app.use("/admin",adminRoutes);


app.get('/', (req, res) => {  
    res.send(`Server is running on http://localhost:${port}`);
});





app.use(errorMiddleware);
app.listen(port, () => {   
    console.log(`Server is running on http://localhost:${port}`);
});