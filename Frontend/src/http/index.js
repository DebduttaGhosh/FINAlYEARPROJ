import axios from "axios";

export const URL = "https://finalyearproj-3.onrender.com";
//export const URL = "http://localhost:5000";

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const saveStudent = () => api.post(`${URL}/api/students/save`);

export const logout = () => api.get(`${URL}/auth/logout`);
