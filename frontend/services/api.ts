import axios from "axios";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const cookies = new Cookies();

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && typeof window !== 'undefined') {
      cookies.remove("authToken");
      toast.error("Usuário não autenticado.");
      return redirect("/auth/login")
    }
    return Promise.reject(error);
  }
);

export default apiClient;
