import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import connectDB from './config/db';
import userRoute from './routes/User.routes'
import adminRoute from './routes/Admin.routes'
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());
// Alternatively, configure CORS for specific origins
// app.use(cors({
//     origin: 'http://your-frontend-domain.com', // Replace with your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

app.use(bodyParser.json());

app.use('/api/users',userRoute );
app.use('/api/admins', adminRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});