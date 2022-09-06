import mongoose from "mongoose";
import { IUser } from "../utils/types";

const userSchema = new mongoose.Schema(
    {
        name:{type:String,reqired:true},
        email:{type:String,reqired:true,unique:true},
        password:{type:String,reqired:true},
        phone:{type:Number,reqired:true, unique:true},
        isAdmin:{type:Boolean,defaule:false, reqired:true}
    },{
        timestamps:true
    }
)
const User = mongoose.model<IUser>("User",userSchema)
export default User