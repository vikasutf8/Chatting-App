import mongoose,{ Schema,model} from "mongoose";
import bcrypt from "bcryptjs";
const schema =new Schema({
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            
            }
        },
    },
    {
        timestamps:true
    }
)

schema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,12);
})

export const User = mongoose.models.User || model("User",schema);