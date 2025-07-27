import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({item,index}) => {
   const photo = [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
    "https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/385388071.jpg?k=de0b51f296a3d9431866b51b974921c9ebb50cacf08eb55c1eec1d468849ffe2&o=&hp=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUtAKhOcU9ueGTMmAgefNj0XNu7piQDtxAXQ&s",
    "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg",
    "https://www.travelanddestinations.com/wp-content/uploads/2017/03/Beautiful-interiors-at-Hotel-Imperial-Vienna.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWQd3R_IR8AqI_bqmUPsUZ-OR6n0L8gGgHeg&s"
  ]
  return (
    <div className="searchItem">
      <img
        src={photo[index % photo.length]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
         {item.description}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
       {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
