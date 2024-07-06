import {User} from '../models/user.model.js';
import { sendToken } from '../utils/feature.js';

const newUser= async (req, res) => {
    const {name,username,password,bio}=req.body;

    const avatar={
        public_id:"test",
        url:"test"
    }
    const newUser=await User.create({
        name,
        username,
        password,
        bio,
        avatar,
    });
    
    sendToken(res, newUser, 201, "User created successfully");
}

const login= async (req, res) => {
    res.send('Hello World');
}

export
{
    login,
    newUser
}