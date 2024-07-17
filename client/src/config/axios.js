import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10 * 60 * 1000,
});

export default instance;