import axios from "axios";
const url = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: url,
  timeout: 10 * 60 * 1000,
});

export default instance;
