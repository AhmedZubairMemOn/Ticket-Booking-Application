import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const {data, loading, error} = useFetch(`${process.env.REACT_APP_BASE_URL}/hotels?featured=true&limit=4`)
  const photo = [
    "https://www.gentinghotel.co.uk/_next/image?url=https%3A%2F%2Fs3.eu-west-2.amazonaws.com%2Fstaticgh.gentinghotel.co.uk%2Fuploads%2Fhero%2FSuiteNov2022_0008_1920.jpg&w=3840&q=75",
    "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
    "https://media.istockphoto.com/id/503016934/photo/entrance-of-luxury-hotel.jpg?s=612x612&w=0&k=20&c=DXFzucB2xWGf3PI6_yjhLKDvrFcGlOpOjXh6KDI8rqU=",
    "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
    "https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7In4Xswp5XlHeBN3h3AdXm4p2ncra3Tb8fw&s"
  ]
  console.log(data);
  
  return (
    <div className="fp">
    {loading ? "loading" : <>
      {data.map((item,index)=>(
        

        <div className="fpRating" key={item._id}>
        <img 
          src={photo[index]}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
        {item.rating &&  <div className="fpItem">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>
    ))}
  
    </>
    }
    </div>
  );
};

export default FeaturedProperties;
