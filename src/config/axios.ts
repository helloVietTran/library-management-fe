import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Cho phép gửi Cookie trong request
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// save access token
const setToken = (token: string) => {
  Cookies.set("lib_jwt_token", token, {
    secure: false,
    expires: 30 / (24 * 60),
  }); // sửa lại sau
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("lib_jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = Cookies.get("lib_refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data } = await api.post(`/auth/refresh`, {
          refreshToken,
        });

        setToken(data.accessToken);
        Cookies.set("lib_refresh_token", data.refreshToken, {
            expires: 2, 
            // secure: true,
            // sameSite: "Strict",
        });
        
        onRefreshed(data.accessToken);
        isRefreshing = false;

        // gửi lại token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
