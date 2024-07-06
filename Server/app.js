import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();
// http://localhost:3000/{user}/{login}
app.use("/user",userRoutes);

app.get('/', (req, res) => {  
    res.send('http://localhost:3000/');
});

app.listen(3000, () => {   
    console.log('Server is running on port 3000');
});