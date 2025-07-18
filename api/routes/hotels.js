import express from 'express'
import hotel from '../models/hotels.js'
import { createError } from '../utils/error.js'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/verifyToken.js'
import { verify } from 'crypto'
import { upload } from "../utils/multer.js";

const router = express.Router()


//create
router.post("/",verifyAdmin,createHotel);

//update
router.put("/:id",verifyAdmin,updateHotel)

//delete
router.delete("/:id",verifyAdmin,deleteHotel)


//all
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id", getHotelRooms);
router.get("/",getHotels)

//get 
router.get("/:id",getHotel)

router.post("/upload", upload.single("photo"), (req, res) => {
  res.status(200).json({ filename: req.file.filename });
});

export default router