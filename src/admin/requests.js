import axios from "axios";
import {setTokenToLocalStorage, getTokenFromLocalStorage} from './helpers/token'


axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      return axios.post("/refreshToken").then(response => {
        const token = response.data.token;
        setTokenToLocalStorage(token);

        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
