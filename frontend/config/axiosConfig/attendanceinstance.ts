import { AttendanceInstance } from "./axios";
AttendanceInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    if (accessToken) {
      if (config.headers) config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
AttendanceInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default AttendanceInstance;
