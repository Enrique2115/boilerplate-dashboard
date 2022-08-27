import axios from "axios";
import { API_HOST } from "src/Config/Constants";
const instance = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
