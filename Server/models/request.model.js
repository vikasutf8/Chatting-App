import { Schema,model, models } from "mongoose";

const schema =new Schema({
        status:{
            type:String,
            default:"pending",
            enum: ["pending", "approved", "rejected"],
            
        },
        sender: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
          },
          receiver: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
          },
    },
    {
        timestamps:true
    }
)


export const Request = models.Request || model('Request',schema);