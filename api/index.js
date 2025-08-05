import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

app.use(cors({
    origin:"https://ticket-booking-application-wvul.vercel.app"
}))

const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
    })
        console.log("connected to mongo db");
        
    }catch(error){
        throw error
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected");
})
//Middlewares


app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "someting went wrong"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  })
})


    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

export default app