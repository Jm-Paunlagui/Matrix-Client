import axios from "axios";

/**
 * @description HTTP client for the application to make API calls to the backend
 */
export default axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_MATRIX_API}`,
  headers: {
    "Content-type": "application/json",
  },
});
