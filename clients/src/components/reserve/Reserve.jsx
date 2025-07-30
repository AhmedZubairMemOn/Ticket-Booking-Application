import React, { useContext, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { SearchContext } from "../../context/SearchContext"
import axios from "axios"
import  { useNavigate } from "react-router-dom"



export const Reserve = ({setOpen, hotelId}) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const {data, loading, error} = useFetch(`${process.env.REACT_APP_BASE_URL}/hotels/room/${hotelId}`)
  const {dates} = useContext(SearchContext)
  console.log(dates);
  
  const navigate = useNavigate()

  console.log("Hotel ID:", hotelId);
console.log("Data from useFetch:", data);
console.log("Loading:", loading);
console.log("Error:", error);

  const getDatesInRange = (startDate, endDate)=>{
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime())

    let list = []
    
    while(date <= end){
      list.push(date.getTime())
      date.setDate(date.getDate() + 1)
    }
    return list
  };

 const allDates = dates?.[0]?.startDate && dates?.[0]?.endDate
    ? getDatesInRange(dates[0].startDate, dates[0].endDate)
    : [];

 const isAvailable = (roomNumber) =>{
  const isFound = roomNumber.unavailableDates.some(date =>
    allDates.includes(new Date(date).getTime())
  )
  console.log("unavailableDates:", roomNumber.unavailableDates);
console.log("allDates:", allDates);
  return !isFound
 } 
 
  
  
  
  const handleSelect = (e)=>{
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked 
      ? [...selectedRooms, value]
      : selectedRooms.filter((item)=> item !== value)
    )
                                    
  }
  console.log(selectedRooms);


 
  const handleClick = async ()=>{
    try {
      await Promise.all(
        selectedRooms.map((roomId)=>{
          const res = axios.put(`${process.env.REACT_APP_BASE_URL}/rooms/availability/${roomId}`,{
            dates:allDates,
          })
          return res.data
        })
      )
      setOpen(false)
      navigate("/")
}
     catch (error) {
      console.log(error);
      
    }
  }
  
    return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=> (setOpen(false))}/>
              <span>Select your rooms:</span>
              {Array.isArray(data) && data.map((item)=>(
              item && (
                <div className="rItem" key={item._id}>

                <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.description}</div>
                <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">

                  {item.roomNumbers.map(roomNumber=>(
                    <div className="room">
                  <label>{roomNumber.number}</label>
                  <input type="checkbox"  value={roomNumber._id} onChange={handleSelect}
                  disabled={!isAvailable(roomNumber)}/>
                </div>
                  
                ))}
                </div>
                </div>
              )
              
))}
<button onClick={handleClick} className="rButton">Reserve Now!</button>
        </div>
    </div>
  )
}
export default Reserve