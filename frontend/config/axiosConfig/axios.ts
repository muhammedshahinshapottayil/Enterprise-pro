import axios from "axios";
const USER_API_URL = "http://localhost:4000/api/user";
const DEP_TASK_URL = "http://localhost:4001/api/";
const TASK_URL = "http://localhost:4002/api/";
const ATTENDANCE_URL = "http://localhost:4003/api/attendance";
const CHAT_URL = "http://localhost:5000/";

export const UserInstance = axios.create({
  baseURL: USER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const DepTaskInstance = axios.create({
  baseURL: DEP_TASK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const TaskInstance = axios.create({
  baseURL: TASK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AttendanceInstance = axios.create({
  baseURL: ATTENDANCE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ChatInstance = axios.create({
  baseURL: CHAT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios.create({
  baseURL: USER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
