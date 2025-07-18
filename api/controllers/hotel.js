import hotels from "../models/hotels.js"
import rooms from "../models/rooms.js"


export const createHotel = async (req,res,next)=>{
     const newHotel = new hotels(req.body)
    
        try{
            const saveHotel = await newHotel.save()
            res.status(200).json(saveHotel)
    
        }catch(err){
            next(err)
        }
}

export const updateHotel = async (req,res,next)=>{
     try{
           const updatedHotel = await hotels.findByIdAndUpdate(req.params.id,
           { $set: req.body },
           {new : true}
            );
           
            res.status(200).json(updatedHotel)
    
        }catch(err){
           next(err)
       }
}

export const deleteHotel = async (req,res,next)=>{
    try{
            await hotels.findByIdAndDelete(req.params.id,
            );
           
            res.status(200).json("hotel has been delete")
    
        }catch(err){
           next(err)
       }
}

export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await hotels.findById(req.params.id,);
         res.status(200).json(hotel)
 
     }catch(err){
           next(err)
       }
}

export const getHotels = async (req,res,next)=>{
    try{
           const hotel = await hotels.find();
           
            res.status(200).json(hotel)
    
        }catch(err){
           next(err)
       }
}
export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
           const list = await Promise.all(cities.map(city=> {
            return hotels.countDocuments({city:city})
           }))
           
            res.status(200).json(list)
    
        }catch(err){
           next(err)
       }
}
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotels.countDocuments({ type: "hotel" });
    const apartmentCount = await hotels.countDocuments({ type: "apartment" });
    const resortCount = await hotels.countDocuments({ type: "resort" });
    const villaCount = await hotels.countDocuments({ type: "villa" });
    const cabinCount = await hotels.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount }
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await hotels.findById(req.params.id);
     if (!hotel) return res.status(404).json("Hotel not found");

    const list = await Promise.all(
      hotel.rooms.map(room => rooms.findById(room))
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};