import axios from "axios";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import Router from "next/router";

const apiService = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-TOKEN",
});

const cookies = new Cookies();

apiService.interceptors.request.use(
  (config) => {
    const token = cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Usuário não autenticado.");
      Router.push("/login")
    }
    return Promise.reject(error);
  }
);

export default apiService;
