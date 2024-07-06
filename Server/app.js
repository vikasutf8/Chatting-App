import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import { connectDB } from './utils/feature.js';

dotenv.config({
    path:'./.env'
});
const mongoURI=process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);


const app = express();
app.use(express.json());



app.use("/user",userRoutes);







app.get('/', (req, res) => {  
    res.send(`Server is running on http://localhost:${port}`);
});

app.listen(port, () => {   
    console.log(`Server is running on http://localhost:${port}`);
});