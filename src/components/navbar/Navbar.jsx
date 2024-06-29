import "./navbar.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const hanndleLogout = () => {
    dispatch({ type: "LOGOUT" });
    alert("LOGOUT successfull");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">VS-Booking</span>
        </Link>
        {!user ? (
          <div className="navbarItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        ) : (
          <Link to="/">
            <button className="navButton" onClick={hanndleLogout}>
              Logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
