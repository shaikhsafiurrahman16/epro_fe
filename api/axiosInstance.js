import axios from "axios";
import Cookies from "js-cookie"; 

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data?.redirect)
    ) {
      Cookies.remove("token");
      window.location.href = "/home";
    }

    return Promise.reject(error);
  }
);
