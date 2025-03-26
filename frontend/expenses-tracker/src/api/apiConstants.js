import axios from "axios";

export const API_BASE_URL = "http://127.0.0.1:5000/";

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});
