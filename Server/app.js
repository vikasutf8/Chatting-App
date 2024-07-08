import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';



import { connectDB } from './utils/feature.js';
import { errorMiddleware } from './middlewares/error.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { createUser } from './seeders/user.js';


dotenv.config({
    path:'./.env'
});
const mongoURI=process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);

// createUser(10);
const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/user",userRoutes);
app.use("/chat",chatRoutes);



app.get('/', (req, res) => {  
    res.send(`Server is running on http://localhost:${port}`);
});





app.use(errorMiddleware);
app.listen(port, () => {   
    console.log(`Server is running on http://localhost:${port}`);
});