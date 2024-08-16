import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import React, { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Featured() {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=hyderabad,bangalore,mumbai"
  );
  // const { data1, loading:loading1, error:error1 } = useFetch("/hotels/find")

  const { dispatch, options } = useContext(SearchContext);

  console.log(data);
  return (
    <div className="featured">
      {loading ? (
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            width: "100%",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Skeleton className="featuredItem" width={300} />
          <Skeleton className="featuredItem" width={300} />
          <Skeleton className="featuredItem" width={300} />
        </div>
      ) : (
        <>
          <Link
            to={`/hotels`}
            state={{ dates, options, destination: "hyderabad" }}
            className="featuredItem"
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hyderabad</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </Link>

          <Link
            to={`/hotels`}
            state={{ dates, options, destination: "bangalore" }}
            className="featuredItem"
          >
            <img src="/bangalore.webp" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Bangalore</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </Link>
          <Link
            to={`/hotels`}
            state={{ dates, options, destination: "mumbai" }}
            className="featuredItem"
          >
            <img src="/mumbai.webp" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
