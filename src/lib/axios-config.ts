import { removeLocalStorageItem } from "@/utils/local-storage";
import axios, { AxiosError, AxiosInstance } from "axios";

const customAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;
    if (
      error?.response?.status === 401 &&
      originalRequest.url !== "/auth/refresh"
    ) {
      try {
        await customAxios.get("/auth/refresh");
        return customAxios(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        removeLocalStorageItem("user");
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default customAxios;
