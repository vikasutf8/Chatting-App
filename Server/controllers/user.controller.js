import {User} from '../models/user.model.js';

const newUser= async (req, res) => {
    const avatar={
        public_id:"test",
        url:"test"
    }
    const newUser=await User.create({
        name:"John Doe",
        username:"johndoe",
        password:"123456",
        avatar
    });
    newUser.save();
    res.status(201).json({
        message:"User Created successfully" ,
        data:newUser
    
    });
}

const login= async (req, res) => {
    res.send('Hello World');
}

export
{
    login,
    newUser
}