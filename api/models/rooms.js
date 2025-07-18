import mongoose from "mongoose"
import {register} from "../controllers/auth.js"

const roomScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    roomNumbers:
        [{number:Number,unavailableDates:{type:[Date]}}],
},
{timestamps:true}
);


export default mongoose.model("Rooms",roomScheme)