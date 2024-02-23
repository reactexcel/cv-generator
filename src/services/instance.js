import axios from "axios";

const instance = axios.create({
  baseURL: "http://116.202.210.102:3030/api/v1/",
});
const token = localStorage.getItem("token");

instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export { instance};
