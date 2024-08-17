import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://vsbookingapp-backend.onrender.com/api",
  withCredentials: true,
});

export default newRequest;
