import { TaskInstance } from "./axios";
TaskInstance.interceptors.request.use(
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
TaskInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default TaskInstance;
