import "./featuredProperties.css";
import useFetch from '../../hooks/useFetch'
import { Link } from "react-router-dom";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("https://vsbookingapp-4sv7.onrender.com/api/hotels/featured?limit=4")
  // console.log(data)
  return (
    <div className="fp">
      {
        loading ? "loading..." :
          <>
            {data.map(item => (
              <Link to={`/hotels/${item._id}`} className="fpItem linkLL">
                <img
                  src={item.photos[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from {item.cheapestPrice}</span>
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              </Link>

            ))}
          </>
      }
    </div>
  );
};

export default FeaturedProperties;