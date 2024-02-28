import axios from "axios";

const instance = axios.create({
  baseURL: "http://116.202.210.102:3030/api/v1/",
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export { instance};
