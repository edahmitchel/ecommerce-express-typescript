import mongoose from "mongoose";
import { IUser } from "../utils/types";

const userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        phone:{type:Number,required:true, unique:true},
        isAdmin:{type:Boolean,default:false, required:true}
    },{
        timestamps:true
    }
)
const User = mongoose.model<IUser>("User",userSchema)
export default User