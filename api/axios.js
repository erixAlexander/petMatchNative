import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_URL;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
