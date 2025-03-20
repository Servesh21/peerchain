// apiService.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true, // if you're handling cookies/auth sessions
});

// Generic GET and POST
export const get = (url) => API.get(url);
export const post = (url, data) => API.post(url, data);

export default API;
