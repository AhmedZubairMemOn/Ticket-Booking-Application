import express from 'express'
import { updateuser, deleteuser, getUser, getUsers } from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user, you are logged in")
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user, you are logged in and you can delete you account")
})

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello admin, you are logged in and you can delete all accounts")
})


//update
router.put("/:id",verifyUser ,updateuser)

//delete
router.delete("/:id",verifyUser,deleteuser)

//get 
router.get("/:id",verifyUser,getUser)

//all
router.get("/",verifyAdmin,getUsers)
export default router