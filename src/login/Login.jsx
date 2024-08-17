import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await newRequest.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      alert("login successfull");
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div>
      <style>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
          crossorigin="anonymous"
        />
      </style>
      <section class="vh-100">
        <div class="container py-5 h-100">
          <h1>Login</h1>
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                class="img-fluid"
                alt="Phone image"
              />
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="username"
                    onChange={handleChange}
                    name="form1Example13"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="form1Example13">
                    Email address
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    name="form1Example23"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="form1Example23">
                    Password
                  </label>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary"
                  id="login-button"
                  onClick={handleClick}
                >
                  Sign in
                </button>

                {error && <span>{error.message}</span>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
