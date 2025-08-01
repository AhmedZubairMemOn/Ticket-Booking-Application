import mongoose from "mongoose"
import {register} from "../controllers/auth.js"

const userScheme = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    
},
{timestamps:true}
);

export default mongoose.model("User",userScheme)