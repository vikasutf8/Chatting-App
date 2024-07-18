import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";


const allUsers = TryCatch(async (req, res,next) => {
    const users = await User.find({});
  
    const transformedUsers = await Promise.all(
      users.map(async ({ name, username, avatar, _id }) => {
        const [groups, friends] = await Promise.all([
          Chat.countDocuments({ groupChat: true, members: _id }),
          Chat.countDocuments({ groupChat: false, members: _id }),
        ]);
  
        return {
          name,
          username,
          avatar: avatar.url,
          _id,
          groups,
          friends,
        };
      })
    );
  
    return res.status(200).json({
      status: "success",
      users: transformedUsers,
    });
  });


  export {
    allUsers,
  }