import axios from "axios";

/**
 * @description HTTP client for the application to make API calls to the backend
 */
export default axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
  },
});
