import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/local-storage";
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

    try {
      if (
        error?.response?.status === 401 &&
        originalRequest.url !== "/auth/refresh"
      ) {
        await refreshAccessToken();
        return customAxios(originalRequest);
      }
      if (error?.response?.status === 403) {
        const response = await getCurrentUser();
        setLocalStorageItem("user", JSON.stringify(response));
        window.location.href = "/my-tasks";
      }
    } catch (refreshError) {
      console.error(refreshError);
      removeLocalStorageItem("user");
      window.location.href = "/auth";
      return Promise.reject(refreshError);
    }
    return Promise.reject(error);
  },
);

export default customAxios;

const getCurrentUser = async () => {
  const res = await customAxios.get("/users/me");
  return res.data;
};

const refreshAccessToken = async () => {
  const res = await customAxios.get("/auth/refresh");
  return res.data;
};
