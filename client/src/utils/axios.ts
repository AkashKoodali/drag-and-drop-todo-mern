import axios from "axios";

//
const baseURL = "https://todo-backend-wp1o.onrender.com"

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axios.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong..."
    )
);

export default axiosInstance;
