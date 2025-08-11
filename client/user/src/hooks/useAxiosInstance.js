import axios from "axios";

const DEFAULT_REMOTE = "https://turf-spot-be.vercel.app";
const LOCAL_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:1234";

const axiosInstance = axios.create({
  baseURL: DEFAULT_REMOTE,
});

axiosInstance.interceptors.request.use((config) => {
  // Force local base URL for registration and OTP verification endpoints when developing
  if (/\/api\/user\/auth\/(register|verify-otp)/.test(config.url)) {
    config.baseURL = LOCAL_BASE;
  }
  let token = null;
  try {
    const persistedUser = localStorage.getItem("persist:user");
    if (persistedUser) {
      const parsedUser = JSON.parse(persistedUser);
      if (parsedUser.auth) {
        const parsedAuth = JSON.parse(parsedUser.auth);
        token = parsedAuth.token;
      }
    }
  } catch (error) {
    console.error("Error parsing persisted user data:", error);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default axiosInstance;
