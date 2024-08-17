import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import newRequest from "../../utils/newRequest";

import { useNavigate } from "react-router-dom";
export default function Reserve({ setOpen, hotelId, handleReserveOpen }) {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectRoom, setSelectRoom] = useState([]);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectRoom(
      checked
        ? [...selectRoom, value]
        : selectRoom.filter((item) => item != value)
    );
  };
  const getDatesRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = getDatesRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const handleClick = async () => {
    try {
      await Promise.all(
        selectRoom.map(async (roomId) => {
          const res = await newRequest.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      alert("Your room booked...");
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rIteminfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc.substr(0, 150) + "..."}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now
        </button>
      </div>
    </div>
  );
}
