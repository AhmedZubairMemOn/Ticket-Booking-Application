import Room from "../models/rooms.js"
import Hotel from "../models/hotels.js"
import rooms from "../models/rooms.js";

export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new rooms(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                    $push:{rooms:savedRoom._id},
            })
        }catch(err){
            next(err)
        }
    res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
};

export const updateRoom = async (req,res,next)=>{
     try{
           const updatedRoom = await Room.findByIdAndUpdate(req.params.id,
           { $set: req.body },
           {new : true}
            );
           
            res.status(200).json(updatedRoom)
    
        }catch(err){
           next(err)
       }
}

export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    try{
            await Room.findByIdAndDelete(req.params.id,
            );
                try{
                    await Hotel.findByIdAndUpdate(hotelId,{
                            $pull:{rooms:req.params.id},
                    })
                }catch(err){
                    next(err)
                }
           
            res.status(200).json("room has been delete")
    
        }catch(err){
           next(err)
       }
}

export const getRoom = async (req,res,next)=>{
    try{
        const room = await Room.findById(req.params.id,);
         res.status(200).json(room)
 
     }catch(err){
           next(err)
       }
}

export const getRooms = async (req,res,next)=>{
    try{
           const rooms = await Room.find();
           
            res.status(200).json(rooms)
    
        }catch(err){
           next(err)
       }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": { $each: req.body.dates }
        }
      }
    );
    res.status(200).json("Room availability updated");
  } catch (err) {
    next(err);
  }
};
