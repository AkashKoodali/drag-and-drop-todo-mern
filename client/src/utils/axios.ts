import axios from "axios";

//

const axiosInstance = axios.create({
  baseURL: "https://todo-backend-wp1o.onrender.com",
});

axios.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong..."
    )
);

export default axiosInstance;
