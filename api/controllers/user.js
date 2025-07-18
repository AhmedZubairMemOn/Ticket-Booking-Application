import User from "../models/users.js"

export const updateuser = async (req,res,next)=>{
     try{
           const updateduser = await user.findByIdAndUpdate(req.params.id,
           { $set: req.body },
           {new : true}
            );
           
            res.status(200).json(updateduser)
    
        }catch(err){
           next(err)
       }
}

export const deleteuser = async (req,res,next)=>{
    try{
            await user.findByIdAndDelete(req.params.id,
            );
           
            res.status(200).json("user has been delete")
    
        }catch(err){
           next(err)
       }
}

export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id,);
         res.status(200).json(user)
 
     }catch(err){
           next(err)
       }
}

export const getUsers = async (req,res,next)=>{
    try{
           const users = await User.find();
           
            res.status(200).json(users)
    
        }catch(err){
           next(err)
       }
}